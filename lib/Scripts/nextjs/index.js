"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//#region Global Imports
const inquirer = require("inquirer");
//#region Global Imports
//#region Local Imports
const helpers_1 = require("../../Plugins/nextjs/helpers");
const config_1 = require("../../config");
const Common_1 = require("../Common");
const helper_1 = require("./helper");
const pluginsEnum_1 = require("./pluginsEnum");
//#endregion Local Imports
const commonQuestions = {
    addStyle: {
        default: true,
        message: 'Do you want to add style file?',
        name: 'hasStyle',
        type: 'confirm'
    },
    connectStore: {
        default: false,
        message: 'Do you want to connect store ?',
        name: 'isConnectStore',
        type: 'confirm'
    },
    enterComponentName: {
        message: 'Enter component name',
        name: 'fileName',
        type: 'input',
        validate(val) {
            return Common_1.CommonHelper.validate(val, config_1.Config.nextjs.componentsDir, false, 'component');
        }
    },
    isHaveReducer: {
        choices: [
            new inquirer.Separator(),
            {
                name: 'Yes, I want to have new reducer.',
                value: true
            },
            {
                name: 'No, do not create a new reducer.',
                value: false
            }
        ],
        message: 'Do you want to create a new reducer or use your own?',
        name: 'isHaveReducer',
        type: 'list',
        when: ({ isConnectStore = false }) => isConnectStore
    }
};
const questions = {
    ClassComponent: [
        commonQuestions.enterComponentName,
        commonQuestions.connectStore,
        commonQuestions.isHaveReducer,
        commonQuestions.addStyle
    ],
    FunctionalComponent: [commonQuestions.enterComponentName, commonQuestions.addStyle],
    Page: [
        {
            message: 'Enter page name',
            name: 'fileName',
            type: 'input',
            validate(val) {
                return Common_1.CommonHelper.validate(val, config_1.Config.nextjs.pagesDir, false, 'page');
            }
        },
        {
            choices: [
                new inquirer.Separator(),
                {
                    name: 'Yes, I want to add custom path?',
                    value: true
                },
                {
                    name: 'No, use default.',
                    value: false
                }
            ],
            message: 'Do you want to add custom route or use default route name?',
            name: 'hasPath',
            type: 'list'
        },
        {
            message: 'Enter route name',
            name: 'routePath',
            type: 'input',
            when: ({ hasPath = false }) => hasPath
        },
        commonQuestions.connectStore,
        commonQuestions.isHaveReducer,
        commonQuestions.addStyle
    ],
    Plugin: [
        {
            choices: [
                new inquirer.Separator(),
                {
                    name: 'Styled Components',
                    value: pluginsEnum_1.Plugins.styled
                },
                {
                    name: 'Sass',
                    value: pluginsEnum_1.Plugins.sass
                }
            ],
            message: 'What plugin do you want to add?',
            name: 'pluginType',
            type: 'list'
        }
    ]
};
const actions = {
    ClassComponent: async (answers) => {
        const { hasStyle = false } = answers;
        answers.fileName = answers.fileName.replace(/\b\w/g, foo => foo.toUpperCase());
        answers.upperFileName = answers.fileName.replace(/\b\w/g, foo => foo.toUpperCase());
        answers.lowerFileName = answers.fileName.replace(/\b\w/g, foo => foo.toLowerCase());
        helper_1.Helper.createClassComponent(answers);
        if (hasStyle) {
            helper_1.Helper.createStyle(answers);
        }
    },
    FunctionalComponent: async (answers) => {
        const { hasStyle = false } = answers;
        answers.fileName = answers.fileName.replace(/\b\w/g, foo => foo.toUpperCase());
        answers.lowerFileName = answers.fileName.replace(/\b\w/g, foo => foo.toLowerCase());
        helper_1.Helper.createFuncComponent(answers);
        if (hasStyle) {
            helper_1.Helper.createStyle(answers);
        }
    },
    Page: async (answers) => {
        const { hasStyle = false } = answers;
        answers.fileName = answers.fileName.replace(/\b\w/g, foo => foo.toUpperCase());
        answers.upperFileName = answers.fileName.replace(/\b\w/g, foo => foo.toUpperCase());
        answers.lowerFileName = answers.fileName.replace(/\b\w/g, foo => foo.toLowerCase());
        answers.isPage = true;
        helper_1.Helper.createClassComponent(answers);
        helper_1.Helper.addRoute(answers);
        if (hasStyle) {
            helper_1.Helper.createStyle(answers);
        }
    },
    Plugin: async (answers) => {
        const { pluginType = pluginsEnum_1.Plugins.styled } = answers;
        helpers_1.PluginHelper[pluginType]();
    }
};
exports.default = {
    showQuestions: async (type) => {
        const componentType = type.replace(' ', '');
        const answers = await inquirer.prompt(questions[componentType]);
        actions[componentType](answers);
    }
};