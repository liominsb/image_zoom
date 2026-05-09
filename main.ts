import { Plugin, MarkdownView, WorkspaceLeaf } from 'obsidian';

// CSS类名前缀，防止样式污染
const PREFIX = 'my-custom-zoom-';

// 接口定义
interface ZoomState {
    scale: number;
    translateX: number;
    translateY: number;
    isDragging: boolean;
    startX: number;
    startY: number;
    lastX: number;
    lastY: number;
}

export default class ImageZoomPanPlugin extends Plugin {
    private overlay: HTMLElement | null = null;
    private imgElement: HTMLImageElement | null = null;
    private zoomState: ZoomState = {
        scale: 1,
        translateX: 0,
        translateY: 0,
        isDragging: false,
        startX: 0,
        startY: 0,
        lastX: 0,
        lastY: 0
    };
    private animationFrameId: number | null = null;

    onload() {
        // 注册事件监听器
        this.registerEvent(
            this.app.workspace.on('layout-change', () => {
                this.setupImageListeners();
            })
        );

        // 初始设置
        this.setupImageListeners();
    }

    onunload() {
        this.removeOverlay();
    }

    /**
     * 设置图片点击监听器
     */
    private setupImageListeners() {
        // 获取所有活动叶子
        const leaves = this.app.workspace.getLeavesOfType('markdown');

        leaves.forEach((leaf: WorkspaceLeaf) => {
            const view = leaf.view as MarkdownView;
            if (!view) return;

            const container = view.containerEl;

            // 移除旧的监听器
            container.removeEventListener('click', this.handleImageClick);

            // 添加新的监听器
            container.addEventListener('click', this.handleImageClick);
        });
    }

    /**
     * 处理图片点击事件
     */
    private handleImageClick = (e: Event) => {
        const mouseEvent = e as MouseEvent;
        const target = mouseEvent.target as HTMLElement;

        // 检查是否点击了图片
        if (target.tagName !== 'IMG') return;

        // 检查是否在阅读模式或实时预览模式中
        const isReadingView = target.closest('.markdown-reading-view');
        const isLivePreview = target.closest('.markdown-source-view');

        if (!isReadingView && !isLivePreview) return;

        // 阻止默认行为和冒泡
        e.preventDefault();
        e.stopPropagation();

        // 显示图片查看层
        this.showOverlay(target as HTMLImageElement);
    };

    /**
     * 显示图片查看层
     */
    private showOverlay(img: HTMLImageElement) {
        // 创建覆盖层
        this.overlay = document.createElement('div');
        this.overlay.className = `${PREFIX}overlay`;

        // 创建图片容器
        const imgContainer = document.createElement('div');
        imgContainer.className = `${PREFIX}img-container`;

        // 创建图片元素
        this.imgElement = document.createElement('img');
        this.imgElement.src = img.src;
        this.imgElement.className = `${PREFIX}img`;

        // 重置缩放状态
        this.zoomState = {
            scale: 1,
            translateX: 0,
            translateY: 0,
            isDragging: false,
            startX: 0,
            startY: 0,
            lastX: 0,
            lastY: 0
        };

        // 组装DOM
        imgContainer.appendChild(this.imgElement);
        this.overlay.appendChild(imgContainer);
        document.body.appendChild(this.overlay);

        // 添加事件监听
        this.addOverlayListeners();

        // 强制重绘后添加显示类
        requestAnimationFrame(() => {
            this.overlay?.classList.add(`${PREFIX}visible`);
        });
    }

    /**
     * 添加覆盖层事件监听
     */
    private addOverlayListeners() {
        if (!this.overlay || !this.imgElement) return;

        // 点击背景关闭
        this.overlay.addEventListener('click', (e) => {
            if (e.target === this.overlay) {
                this.removeOverlay();
            }
        });

        // 键盘事件
        document.addEventListener('keydown', this.handleKeyDown);

        // 滚轮缩放
        this.overlay.addEventListener('wheel', this.handleWheel, { passive: false });

        // 鼠标拖拽
        this.imgElement.addEventListener('mousedown', this.handleMouseDown);
        document.addEventListener('mousemove', this.handleMouseMove);
        document.addEventListener('mouseup', this.handleMouseUp);
    }

    /**
     * 移除覆盖层事件监听
     */
    private removeOverlayListeners() {
        document.removeEventListener('keydown', this.handleKeyDown);
        document.removeEventListener('mousemove', this.handleMouseMove);
        document.removeEventListener('mouseup', this.handleMouseUp);

        if (this.animationFrameId) {
            cancelAnimationFrame(this.animationFrameId);
            this.animationFrameId = null;
        }
    }

    /**
     * 处理键盘事件
     */
    private handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
            this.removeOverlay();
        }
    };

    /**
     * 处理滚轮缩放
     */
    private handleWheel = (e: WheelEvent) => {
        e.preventDefault();

        if (!this.overlay || !this.imgElement) return;

        const rect = this.imgElement.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        // 计算缩放因子
        const delta = e.deltaY > 0 ? 0.9 : 1.1;
        const newScale = Math.min(Math.max(this.zoomState.scale * delta, 0.1), 10);

        // 计算以鼠标位置为中心的缩放
        const scaleChange = newScale / this.zoomState.scale;
        const newTranslateX = mouseX - (mouseX - this.zoomState.translateX) * scaleChange;
        const newTranslateY = mouseY - (mouseY - this.zoomState.translateY) * scaleChange;

        this.zoomState.scale = newScale;
        this.zoomState.translateX = newTranslateX;
        this.zoomState.translateY = newTranslateY;

        this.updateTransform();
    };

    /**
     * 处理鼠标按下
     */
    private handleMouseDown = (e: MouseEvent) => {
        if (e.button !== 0) return; // 只响应左键

        this.zoomState.isDragging = true;
        this.zoomState.startX = e.clientX;
        this.zoomState.startY = e.clientY;
        this.zoomState.lastX = this.zoomState.translateX;
        this.zoomState.lastY = this.zoomState.translateY;

        if (this.imgElement) {
            this.imgElement.classList.add(`${PREFIX}dragging`);
        }
    };

    /**
     * 处理鼠标移动
     */
    private handleMouseMove = (e: MouseEvent) => {
        if (!this.zoomState.isDragging) return;

        // 使用requestAnimationFrame节流
        if (this.animationFrameId) return;

        this.animationFrameId = requestAnimationFrame(() => {
            const deltaX = e.clientX - this.zoomState.startX;
            const deltaY = e.clientY - this.zoomState.startY;

            this.zoomState.translateX = this.zoomState.lastX + deltaX;
            this.zoomState.translateY = this.zoomState.lastY + deltaY;

            this.updateTransform();
            this.animationFrameId = null;
        });
    };

    /**
     * 处理鼠标释放
     */
    private handleMouseUp = () => {
        this.zoomState.isDragging = false;

        if (this.imgElement) {
            this.imgElement.classList.remove(`${PREFIX}dragging`);
        }
    };

    /**
     * 更新图片变换
     */
    private updateTransform() {
        if (!this.imgElement) return;

        this.imgElement.style.transform = `translate(${this.zoomState.translateX}px, ${this.zoomState.translateY}px) scale(${this.zoomState.scale})`;
    }

    /**
     * 移除覆盖层
     */
    private removeOverlay() {
        if (!this.overlay) return;

        this.removeOverlayListeners();

        this.overlay.classList.remove(`${PREFIX}visible`);

        // 等待动画结束后移除元素
        setTimeout(() => {
            this.overlay?.remove();
            this.overlay = null;
            this.imgElement = null;
        }, 300);
    }
}
