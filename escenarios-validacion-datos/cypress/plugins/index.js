/// <reference types="cypress" />
const fs = require("fs");
const path = require("path");
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

/**
 * @type {Cypress.PluginConfig}
 */
// eslint-disable-next-line no-unused-vars
module.exports = (on, config) => {

	on("task", {
		log({ message }) {
			console.log(message);
			return null;
		},
	});
	on("after:screenshot", (details) => {
		
		const versionForlder= path.join(
			__dirname,
			`../screenshots/${config.env.versionGhost}`)
		if (!fs.existsSync(versionForlder)) {
			fs.mkdirSync(versionForlder);
		}
		if (details.name && details.name.split("/")[0] && !details.testFailure) {
			const newPath = path.join(
				__dirname,
				`../screenshots/${config.env.versionGhost}/${details.name}.png`
			);
			const stagePath = path.join(
				__dirname,
				`../screenshots/${config.env.versionGhost}/${details.name.split("/")[0]}`
			);
			return new Promise((resolve, reject) => {
				if (!fs.existsSync(stagePath)) {
					fs.mkdirSync(stagePath);
				}
				// fs.rename moves the file to the existing directory 'new/path/to'
				// and renames the image to 'screenshot.png'
				fs.rename(details.path, newPath, (err) => {
					if (err) return reject(err);

					// because we renamed and moved the image, resolve with the new path
					// so it is accurate in the test results
					resolve({ path: newPath });
				});
			});
		}
	});
};
