"use strict";
exports.__esModule = true;
exports.upload = exports.fs = exports.path = void 0;
exports.path = require('path');
exports.fs = require('fs');
var allNumber = 0;
var tmpNumber = 0;
var sucNumber = 0;
var retNumber = 0;
var sizeNumber = 0;
function upload(client, ossConfig) {
    console.log("[ossdeployer-cli] START UPLOADING... oss://".concat(ossConfig.bucket, "/").concat(ossConfig.target));
    var list = _list(exports.path.posix.join(process.cwd(), ossConfig.source));
    allNumber = list.length;
    if (list.length > 0) {
        list.forEach(function (item) {
            _upload(item, client, ossConfig);
        });
    }
    else {
        _result();
    }
}
exports.upload = upload;
function _result() {
    if (allNumber === tmpNumber) {
        console.log("[ossdeployer-cli] RESULT:   ".concat(_renderSize(sizeNumber), " - [ SIZE ]   ").concat(allNumber, " - [ ALL ]   ").concat(sucNumber, " - [ SUCCESS ]   ").concat(retNumber, " - [ RETRY ]"));
    }
}
function _upload(item, client, ossConfig, retry) {
    if (retry === void 0) { retry = true; }
    client.put("".concat(ossConfig.target).concat(item.relative), item.file).then(function () {
        sucNumber++;
        tmpNumber++;
        sizeNumber += item.size;
        console.log("[ossdeployer-cli] [ ".concat(item.file, " ] SUCCESS   \u2714 [").concat(_renderSize(item.size), "]"));
        _result();
    })["catch"](function () {
        if (retry) {
            _upload(item, client, ossConfig, false);
        }
        else {
            retNumber++;
            tmpNumber++;
            console.log("[ossdeployer-cli] [ ".concat(item.file, " ] FAILURE   \u2718 "));
            _result();
        }
    });
}
function _list(src) {
    var entrysList = [];
    var fetchFile = function (file) {
        if (!exports.fs.existsSync(file)) {
            return;
        }
        var fileStat = exports.fs.statSync(file);
        if (fileStat.isDirectory()) {
            var fileList = exports.fs.readdirSync(file);
            if (!fileList.length) {
                return;
            }
            fileList.forEach(function (item) {
                fetchFile(exports.path.posix.join(file, "./".concat(item)));
            });
        }
        else {
            entrysList.push({ file: file, relative: exports.path.posix.relative(src, file), size: fileStat.size });
        }
    };
    fetchFile(src);
    return entrysList;
}
function _renderSize(value) {
    if (null == value || value == '') {
        return "0 Bytes";
    }
    var unitArr = new Array("Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB");
    var index = 0;
    var srcsize = parseFloat(value);
    index = Math.floor(Math.log(srcsize) / Math.log(1024));
    var size = srcsize / Math.pow(1024, index);
    size = size.toFixed(2);
    return size + unitArr[index];
}
