//#region Global Imports
import * as fs from 'fs';
import * as path from 'path';
//#endregion Global Imports

//#region Local Imports
import { Config } from '../../config';
import { CommonHelper } from '../Common';
import { ICommon } from '../ICommon';
//#endregion Local Imports

export const Helper = {
	addBrokerHelper: (answers: ICommon.IAnswers): void => {
		const brokerHelperImport = './dist/Templates/moleculer/Tests/BrokerHelperImport.mustache';
		const brokerHelperCreate = './dist/Templates/moleculer/Tests/BrokerHelperCreate.mustache';

		const templateProps = {
			fileName: answers.fileName,
			upperFileName: answers.upperFileName
		};

		const replaceBrokerImportParams: ICommon.IReplaceContent = {
			fileDir: Config.brokerHelper,
			filetoUpdate: fs.readFileSync(path.resolve('', Config.brokerHelper), 'utf8'),
			getFileContent: () => CommonHelper.getTemplate(brokerHelperImport, templateProps),
			message: 'Service added to BrokerHelper Import',
			regexKey: /\/\/\#endregion Local Imports/g
		};

		setTimeout(
			() => {
				const replaceBrokerCreateParams: ICommon.IReplaceContent = {
					fileDir: Config.brokerHelper,
					filetoUpdate: fs.readFileSync(path.resolve('', Config.brokerHelper), 'utf8'),
					getFileContent: () => CommonHelper.getTemplate(brokerHelperCreate, templateProps),
					message: 'Service added to BrokerHelper setupBroker.\n',
					regexKey: /^\s*return broker;/gm
				};
				CommonHelper.replaceContent(replaceBrokerCreateParams);
			},
			1500
		);

		CommonHelper.replaceContent(replaceBrokerImportParams);
	},
	createEntityInstance: (answers: ICommon.IAnswers) => {
		const templatePath = './dist/Templates/moleculer/Repositories/Entity.mustache';
		const templateProps = { fileName: answers.fileName };
		const indexTemplate = './dist/Templates/moleculer/Repositories/EntityIndex.mustache';

		const writeFileProps: ICommon.IWriteFile = {
			dirPath: `${Config.entityDir}/${answers.fileName}.ts`,
			getFileContent: () => CommonHelper.getTemplate(templatePath, templateProps),
			message: 'Added new Entity Instance.'
		};

		const addIndexParams: ICommon.IAddIndex = {
			dirPath: `${Config.entityDir}/index.ts`,
			getFileContent: () => CommonHelper.getTemplate(indexTemplate, templateProps),
			message: 'Entity added to index.ts.'
		};

		CommonHelper.writeFile(writeFileProps);
		CommonHelper.addToIndex(addIndexParams);
	},
	createRepository: (answers: ICommon.IAnswers): void => {
		const templatePath = './dist/Templates/moleculer/Repositories/Repository.mustache';

		const templateProps = {
			fileName: answers.fileName,
			upperFileName: answers.upperFileName
		};

		const indexTemplate = './dist/Templates/moleculer/Repositories/RepoIndex.mustache';

		const addIndexParams: ICommon.IAddIndex = {
			dirPath: `${Config.repositoriesDir}/index.ts`,
			getFileContent: () => CommonHelper.getTemplate(indexTemplate, templateProps),
			message: 'Repository added to index.ts.'
		};

		const writeFileProps: ICommon.IWriteFile = {
			dirPath: `${Config.repositoriesDir}/${answers.fileName}.ts`,
			getFileContent: () => CommonHelper.getTemplate(templatePath, templateProps),
			message: 'Added new Repository.'
		};

		const repositoryTestParams = {
			answers,
			dirPath: `${Config.repositoriesTestDir}/${answers.fileName}.spec.ts`,
			successMessage: 'Added new Repository test.',
			templatePath: './dist/Templates/moleculer/Tests/Repository.mustache',
			templateProps
		};

		if (!CommonHelper.isAlreadyExist(Config.interfaceDir, answers.fileName)) {
			Helper.createInterface(answers, 'Repositories');
		}

		CommonHelper.writeFile(writeFileProps);
		CommonHelper.addToIndex(addIndexParams);
		Helper.createEntityInstance(answers);
		Helper.createTest(repositoryTestParams);
	},
	createService: (answers: ICommon.IAnswers): void => {
		const templatePath = './dist/Templates/moleculer/Services/Service.mustache';
		const templateProps = {
			fileName: answers.fileName,
			hasDatabase: answers.hasDatabase,
			isPrivate: answers.isPrivate,
			upperFileName: answers.upperFileName
		};

		const indexTemplate = './dist/Templates/moleculer/Services/index.mustache';

		const addIndexParams: ICommon.IAddIndex = {
			dirPath: `${Config.servicesDir}/index.ts`,
			getFileContent: () => CommonHelper.getTemplate(indexTemplate, templateProps),
			message: 'Service added to index.ts.'
		};

		const writeFileProps: ICommon.IWriteFile = {
			dirPath: `${Config.servicesDir}/${answers.fileName}.service.ts`,
			getFileContent: () => CommonHelper.getTemplate(templatePath, templateProps),
			message: 'Added new Service.'
		};

		const serviceTestParams = {
			answers,
			dirPath: `${Config.servicesTestDir}/${answers.fileName}.spec.ts`,
			successMessage: 'Added new Microservice test.',
			templatePath: './dist/Templates/moleculer/Tests/Service.mustache',
			templateProps
		};

		const integrationTestParams = {
			answers,
			dirPath: `${Config.integrationTestDir}/${answers.fileName}.spec.ts`,
			successMessage: 'Added new Integration test.',
			templatePath: './dist/Templates/moleculer/Tests/IntegrationTest.mustache',
			templateProps
		};

		if (!CommonHelper.isAlreadyExist(Config.interfaceDir, answers.fileName)) {
			Helper.createInterface(answers, 'Services', 'Service');
		}

		CommonHelper.writeFile(writeFileProps);
		CommonHelper.addToIndex(addIndexParams);
		Helper.createServiceHelper(answers);
		Helper.createTest(serviceTestParams);
		Helper.createIntegrationTest(integrationTestParams);
		Helper.addBrokerHelper(answers);
	},
	createServiceHelper: (answers: ICommon.IAnswers): void => {
		const templatePath = './dist/Templates/moleculer/Services/Helper.mustache';
		const indexTemplate = './dist/Templates/moleculer/Services/HelperIndex.mustache';

		const templateProps = {
			fileName: answers.fileName,
			upperFileName: answers.upperFileName
		};

		const writeFileProps: ICommon.IWriteFile = {
			dirPath: `${Config.servicesHelperDir}/${answers.upperFileName}Helper.ts`,
			getFileContent: () => CommonHelper.getTemplate(templatePath, templateProps),
			message: 'Added new Service Helper'
		};

		const addIndexParams: ICommon.IAddIndex = {
			dirPath: `${Config.servicesHelperDir}/index.ts`,
			getFileContent: () => CommonHelper.getTemplate(indexTemplate, templateProps),
			message: 'Service Helper added to index.ts.'
		};

		const serviceHelperTestParams = {
			answers,
			dirPath: `${Config.serviceHelperTestDir}/${answers.upperFileName}Helper.spec.ts`,
			successMessage: 'Added new Micro Service Helper test.',
			templatePath: './dist/Templates/moleculer/Tests/ServiceHelper.mustache',
			templateProps
		};

		CommonHelper.writeFile(writeFileProps);
		CommonHelper.addToIndex(addIndexParams);
		Helper.createTest(serviceHelperTestParams);
	},

	createIntegrationTest: (options: ICommon.ICreateTest): void => {

		const integrationProps: ICommon.IWriteFile = {
			dirPath: options.dirPath,
			getFileContent: () => CommonHelper.getTemplate(options.templatePath, options.templateProps),
			message: options.successMessage
		};

		CommonHelper.writeFile(integrationProps);
	},
	createInterface: (answers: ICommon.IAnswers, dirType: string, prefix: string = '') => {
		const templatePath = `./dist/Templates/moleculer/Interfaces/${prefix}Interface.mustache`;
		const indexInterfaceTemplate = './dist/Templates/moleculer/Interfaces/index.mustache';
		const folderIndexTemplate = './dist/Templates/moleculer/Interfaces/FolderIndex.mustache';

		const templateProps = { upperFileName: answers.upperFileName, dirType };
		const interfaceFilePath = `${Config.interfaceDir}/${dirType}/${answers.upperFileName}/I${answers.upperFileName}.d.ts`;
		const interfaceDirPath = `${Config.interfaceDir}/${dirType}/${answers.upperFileName}`;

		const writeFileProps: ICommon.IWriteFile = {
			dirPath: interfaceFilePath,
			getFileContent: () => CommonHelper.getTemplate(templatePath, templateProps),
			message: 'Created new interface file.'
		};

		const addIndexParams: ICommon.IAddIndex = {
			dirPath: `${Config.interfaceDir}/index.ts`,
			getFileContent: () => CommonHelper.getTemplate(indexInterfaceTemplate, templateProps),
			message: 'Interface added to index.ts.'
		};

		const addFolderIndex: ICommon.IAddIndex = {
			dirPath: `${Config.interfaceDir}/${dirType}/${answers.upperFileName}/index.ts`,
			getFileContent: () => CommonHelper.getTemplate(folderIndexTemplate, templateProps),
			message: 'Interface added to folder index.ts.'
		};

		CommonHelper.createFile(interfaceDirPath);
		CommonHelper.writeFile(writeFileProps);
		CommonHelper.addToIndex(addIndexParams);
		CommonHelper.addToIndex(addFolderIndex);
	},
	createTest: (options: ICommon.ICreateTest): void => {
		const writeFileProps: ICommon.IWriteFile = {
			dirPath: options.dirPath,
			getFileContent: () => CommonHelper.getTemplate(options.templatePath, options.templateProps),
			message: options.successMessage
		};

		CommonHelper.writeFile(writeFileProps);

	},
	isServiceAlreadyExist: (startPath: string, val: string): boolean => {
		val = val.replace(/\b\w/g, foo => foo.toLowerCase());

		const _path = `${startPath}/${val}.service.ts`;

		return fs.existsSync(path.resolve('', _path));
	}
};