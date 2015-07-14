define(['lodash', 'json!experiments/santa.json', 'json!experiments/santa-editor.json'], function (_, viewerExp, editorExp) {
    'use strict';

    var experiments = _.zipObject(viewerExp.concat(editorExp));
    var callbacks = [];

    var localSettings = {
        autoRedirect: false
    };

    function storageSettings() {
        return _.transform(localSettings, function (acc, value, key) {
            acc['settings.' + key] = value;
        });
    }

    chrome.storage.onChanged.addListener(function (changes) {
        var result = {};
        if (_.has(changes, 'settings.autoRedirect')) {
            result.autoRedirect = changes['settings.autoRedirect'].newValue;
        }

        var experimentChanges = _.omit(changes, ['settings.autoRedirect']);
        if (!_.isEmpty(experimentChanges)) {
            _.each(experimentChanges, function (value, expName) {
                experiments[expName] = value.newValue;
            });
            result.experiments = experiments;
        }

        _.each(callbacks, function (callback) {
            callback(result);
        })
    });

    return {
        getExperiments: function () {
            var defer = Promise.defer();
            chrome.storage.local.get(viewerExp.concat(editorExp), function (result) {
                _.assign(experiments, result);
                defer.resolve(experiments);
            });

            return defer.promise;
        },

        toggleExperiment: function (name, enabled) {
            experiments[name] = _.isUndefined(enabled) ? !experiments[name] : enabled;

            var defer = Promise.defer();
            chrome.storage.local.set(_.pick(experiments, [name]), function () {
                defer.resolve(experiments[name]);
            });

            return defer.promise;
        },

        settings: {
            get: function () {
                var defer = Promise.defer();
                chrome.storage.local.get(_.keys(storageSettings()), function (result) {
                    localSettings = _.transform(result, function (acc, value, key) {
                        acc[key.split('.')[1]] = value;
                    });

                    defer.resolve(localSettings);
                });

                return defer.promise;
            },
            set: function (settings) {
                _.assign(localSettings, settings);
                chrome.storage.local.set(storageSettings(), _.noop);
            }
        },

        registerForChanges: function (callback) {
            callbacks.push(callback);
        }
    }

});