var load = require('./load.js');
var newConfig = require('./config.js');
var config = newConfig();

var functionGist = function (fileName) {
    var returnFunction = null;

    searchGistID(function (gistUrl, idGist) {
        if (gistUrl[idGist][fileName]) {
            returnFunction = new Function('', gistUrl[idGist][fileName].content);
        }
    });

    return returnFunction;
};

var loadGist = function (id, callback) {
    var file = id.file;

    if (id.url) {
        newConfig({
            gistUrl: id.url
        });
    }

    if (file) {
        callback = function () {
            functionGist(file)();
        };
    }

    if (id.id) {
        id = id.id;
    }

    loadGistFromId(id, callback);
};

function loadGistFromId(id, callback) {
    if (findId(id)) {
        callback();
    } else {
        loadGistFromJSONP(id, callback);
    }
}

function findId(id) {
    var find = null;

    searchGistID(function (gistUrl, idGist) {
        if (idGist === id) {
            find = gistUrl[idGist];
        }
    });

    return find;
}

function searchGistID(callback) {
    var gists = config.gists;

    Object.keys(gists || {}).forEach(function (urlGist) {
        Object.keys(gists[urlGist] || {}).forEach(function (idGist) {
            callback(gists[urlGist], idGist);
        });
    });
}

function loadGistFromJSONP(id, callback) {
    load.loadJsonP(config.gistUrl + id + '.json', function (res) {
        var files = _getFilesFromHTML(res.div);
        _addFilesToConfigGists(id, files);
        callback();
    });
}

function _addFilesToConfigGists(id, files) {
    if (!config.gists) {
        config.gists = {};
    }

    if (!config.gists[config.gistUrl]) {
        config.gists[config.gistUrl] = {};
    }

    if (!config.gists[config.gistUrl][id]) {
        config.gists[config.gistUrl][id] = files;
    }
}

function _getFilesFromHTML(htmlData) {
    var gistFiles = htmlData.split('<div class="gist-file">').slice(1);
    var files = {};
    var el = document.createElement('div');
    var getText = function (dataHTML) {
        el.innerHTML = dataHTML.replace(/<\/div>/g, '\n</div>');
        return el.textContent.replace(/\n\n/g, '');
    };

    gistFiles.forEach(function (gistFile) {
        var gistMeta = gistFile.split('<div class="gist-meta">');
        var fileName = getText(gistMeta[1].split('</a>')[1] + '</a>').replace(/[\n  ]/g, '');

        files[fileName] = {
            content: getText(gistMeta[0].split('<td class="line-data">')[1])
        };
    });

    return files;
}

module.exports = {
    loadGist: loadGist,
    functionGist: functionGist
};