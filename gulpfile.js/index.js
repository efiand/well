'use strict';
// Подключение хранилища
const { plugins, functions, settings } = require(`./store`);

// Добавление функций в хранилище
plugins.requireDir(`functions`);

// Добавление общих для сборки и шаблона данных в хранилище
settings.project = functions.smartRequire(`source/data/project.json`);

// Добавление данных для шаблона в хранилище
settings.layout = functions.smartRequire(`source/data/layout.json`);

// Добавление настроек всех задач в хранилище
settings.tasks = plugins.requireDir(`settings`);

// Добавление задач к gulp, находящемуся в хранилище
plugins.requireDir(`tasks`);
