"use strict";
var GulpConfig = (function () {
    function GulpConfig() {

        // ----------------------------------------------------------
        // Vendor
        // ----------------------------------------------------------

        this.vendor = [
            "bower_components/jquery/jquery.min.js",
            "bower_components/lodash/lodash.min.js",
            "bower_components/animate.css/animate.min.css",
            "bower_components/font-awesome/css/font-awesome.min.css",

            "bower_components/bootstrap/dist/js/bootstrap.min.js",
            "bower_components/bootstrap/dist/css/bootstrap.min.css",

            "bower_components/hello/dist/hello.all.min.js"



        ];

        // ----------------------------------------------------------
        // Source Paths
        // ----------------------------------------------------------

        this.revAllOptions = {
            dontRenameFile: ["index.html"]
        };

        // Relative to Root folder

        this.htmlFiles = [
            "**/*.html",
            "**/**/*.html"
        ];

        this.cssFiles = [
            "**/*.css"
        ];

        this.scssFiles = [
            "!**/_*.scss",
            "**/*.scss"
        ];

        this.scssRebuildAllFiles = [
            "**/_*.scss"
        ];

        this.typeScriptFiles = [
            "**/*.ts"
        ];
        this.typeScriptLintFiles = [
            "**/*.ts"
        ];

        this.javaScriptFiles = [
            "**/*.js"
        ];

        // Relative to Root folder

        this.typeScriptDefinitions = [
            "typings/tsd.d.ts"
        ];

        this.copyFiles = [
            ["bower_components/bootstrap/dist/fonts/**/*", "fonts"],
            ["bower_components/font-awesome/fonts/*.woff", "fonts"],
            ["node_modules/rxjs/**/*.js", "rxjs"],
            ["node_modules/zone.js/**/*.js", "zone.js"],
            ["node_modules/angular2/**/*.js", "angular2"],
            ["node_modules/es6-promise/**/*.js", "es6-promise"],
            ["node_modules/es6-shim/**/*.js", "es6-shim"],
            ["node_modules/reflect-metadata/**/*.js", "reflect-metadata"],
            ["assets/images/**","images"],
            ["node_modules/ng2-material/**","ng2-material"]
        ];

        // ----------------------------------------------------------
        // SystemJS
        // ----------------------------------------------------------

        this.systemImportMain = "boot";

        this.systemJSConfig = {
            baseURL: "",
            defaultJSExtensions: true,

            "paths": {
                "*": "*.js"
            }
        };

        // ----------------------------------------------------------
        // Output
        // ----------------------------------------------------------

        this.target = "";

        this.targetApp = this.target + "www";

        this.targetJs = this.targetApp;

        // ----------------------------------------------------------
        // BrowserSync
        // ----------------------------------------------------------

        this.browserSyncOptions = {
            injectChanges: true,
            reloadDelay: 750,
            open: false,
            online: true,
            reloadOnRestart: true,
            port: 9999,
            proxy: {
                target: "http://localhost:6007",
                ws: true
            }
            //server: {
            //    baseDir: this.targetApp,
            //    directory: true
            //}//,
            //files: this.targetApp + '/**/*'
        };

    }

    return GulpConfig;
})();
module.exports = GulpConfig;
