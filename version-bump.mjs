import { readFileSync, writeFileSync } from "fs";

const targetVersion = process.env.npm_package_version;

// 读取 minAppVersion 和 manifest.json
let minAppVersion = JSON.parse(
    readFileSync("manifest.json", "utf8")
).minAppVersion;
let manifest = JSON.parse(readFileSync("manifest.json", "utf8"));
const { minAppVersion: currentMinAppVersion, ...manifestRest } = manifest;

// 更新 manifest.json 中的版本号
manifest = { ...manifestRest, version: targetVersion };
writeFileSync("manifest.json", JSON.stringify(manifest, null, "\t"));

// 更新 versions.json 中的版本号
let versions = JSON.parse(readFileSync("versions.json", "utf8"));
versions[targetVersion] = minAppVersion;
writeFileSync("versions.json", JSON.stringify(versions, null, "\t"));
