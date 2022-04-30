exports.ids = [26];
exports.modules = {

/***/ "./docs/github/v2/03-test-runner.md":
/*!******************************************!*\
  !*** ./docs/github/v2/03-test-runner.md ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("# Test runner\r\n\r\nRunning your test suite in an automated workflow helps increase certainty when merging.\r\n\r\nUse [Unity - Test runner](https://github.com/marketplace/actions/unity-test-runner) to run your Unity tests.\r\n\r\n## Basic setup\r\n\r\nBy default, the test runner will run both `playmode` and `editmode` tests.\r\n\r\nCreate or edit the file called `.github/workflows/main.yml` and add a job to it.\r\n\r\n#### Personal license\r\n\r\nPersonal licenses require a one-time manual activation step.\r\n\r\nMake sure you\r\n[acquire and activate](https://github.com/marketplace/actions/unity-request-activation-file)\r\nyour license file and add it as a secret.\r\n\r\nThen, define the test step as follows:\r\n\r\n```yaml\r\n- uses: game-ci/unity-test-runner@v2\r\n  env:\r\n    UNITY_LICENSE: ${{ secrets.UNITY_LICENSE }}\r\n  with:\r\n    projectPath: path/to/your/project\r\n    githubToken: ${{ secrets.GITHUB_TOKEN }}\r\n```\r\n\r\n#### Professional license\r\n\r\nMake sure you have set up these variables in the activation step.\r\n\r\n- `UNITY_EMAIL` (should contain the email address for your Unity account)\r\n- `UNITY_PASSWORD` (the password that you use to login to Unity)\r\n- `UNITY_SERIAL` (the serial provided by Unity)\r\n\r\nDefine the test step as follows:\r\n\r\n```yaml\r\n- uses: game-ci/unity-test-runner@v2\r\n  env:\r\n    UNITY_EMAIL: ${{ secrets.UNITY_EMAIL }}\r\n    UNITY_PASSWORD: ${{ secrets.UNITY_PASSWORD }}\r\n    UNITY_SERIAL: ${{ secrets.UNITY_SERIAL }}\r\n  with:\r\n    projectPath: path/to/your/project\r\n    githubToken: ${{ secrets.GITHUB_TOKEN }}\r\n```\r\n\r\nThat is all you need to test your project.\r\n\r\n## Viewing test results\r\n\r\nThe test results can be viewed from a [GitHub Status Check](https://docs.github.com/en/github/collaborating-with-issues-and-pull-requests/about-status-checks).\r\n\r\nTo get this functionality, simply provide the [GitHub Token](https://docs.github.com/en/actions/reference/authentication-in-a-workflow#about-the-github_token-secret)\r\nin order to view the tests results from [a check run](https://docs.github.com/en/rest/guides/getting-started-with-the-checks-api#about-check-runs).\r\n\r\n```yaml\r\n- uses: game-ci/unity-test-runner@v2\r\n  with:\r\n    githubToken: ${{ secrets.GITHUB_TOKEN }}\r\n```\r\n\r\nIf you choose not to provide the `githubToken`, you may still upload the artifacts in order to access them.\r\n\r\n## Storing test results\r\n\r\nTo be able to access the test results, they need to be uploaded as artifacts.\r\n\r\nTo do this, it is recommended to use the official Github Actions\r\n[upload artifact action](https://github.com/marketplace/actions/upload-a-build-artifact).\r\n\r\nBy default, Test Runner outputs its results to a folder named `artifacts`.\r\n\r\n```yaml\r\n- uses: actions/upload-artifact@v2\r\n  if: always()\r\n  with:\r\n    name: Test results\r\n    path: artifacts\r\n```\r\n\r\nTest results can now be downloaded as `Artifacts` in the `Actions` tab.\r\n\r\n#### Specifying artifacts folder\r\n\r\nYou can specify a different `artifactsPath` in the test runner and reference this path using the `id` of the test step.\r\n\r\n```yaml\r\n- uses: game-ci/unity-test-runner@v2\r\n  id: myTestStep\r\n```\r\n\r\n```yaml\r\n- uses: actions/upload-artifact@v2\r\n  if: always()\r\n  with:\r\n    name: Test results\r\n    path: ${{ steps.myTestStep.outputs.artifactsPath }}\r\n```\r\n\r\n## Caching\r\n\r\nIn order to make test runs (and builds) faster,\r\nyou can cache Library files from previous runs.\r\n\r\nTo do so, simply add Github Actions' official\r\n[cache action](https://github.com/marketplace/actions/cache)\r\nbefore any unity steps.\r\n\r\n```yaml\r\n- uses: actions/cache@v2\r\n  with:\r\n    path: path/to/your/project/Library\r\n    key: Library-MyProjectName-TargetPlatform\r\n    restore-keys: |\r\n      Library-MyProjectName-\r\n      Library-\r\n```\r\n\r\nThis simple addition could speed up your test runs by more than 50%.\r\n\r\n## Configuration options\r\n\r\nBelow options can be specified under `with:` for the `unity-test-runner` action.\r\n\r\n#### unityVersion\r\n\r\nVersion of Unity to use for testing the project.\r\nUse \"auto\" to get from your ProjectSettings/ProjectVersion.txt\r\n\r\n_**required:** `false`_\r\n_**default:** `auto`_\r\n\r\n#### customImage\r\n\r\nSpecific docker image that should be used for testing the project.\r\n\r\n```yaml\r\n- uses: game-ci/unity-test-runner@v2\r\n  with:\r\n    customImage: 'unityci/editor:2020.1.14f1-base-0'\r\n```\r\n\r\n_**required:** `false`_\r\n_**default:** `\"\"`_\r\n\r\n#### projectPath\r\n\r\nSpecify the path to your Unity project to be tested.\r\nThe path should be relative to the root of your project.\r\n\r\n_**required:** `false`_\r\n_**default:** `<your project root>`_\r\n\r\n#### customParameters\r\n\r\nCustom parameters to configure the test runner.\r\n\r\nFor example, you may refer to the [Unity Test Framework command line arguments](https://docs.unity3d.com/Packages/com.unity.test-framework@2.0/manual/reference-command-line.html) for options that could help with configuring your tests.\r\n\r\nParameters must start with a hyphen (`-`) and may be followed by a value (without hyphen).\r\n\r\nParameters without a value will be considered booleans (with a value of true).\r\n\r\n```yaml\r\n- uses: game-ci/unity-test-runner@v2\r\n  with:\r\n    customParameters: -profile SomeProfile -someBoolean -someValue exampleValue\r\n```\r\n\r\n_**required:** `false`_\r\n_**default:** `\"\"`_\r\n\r\n#### testMode\r\n\r\nThe type of tests to be run by the test runner.\r\n\r\nOptions are: `All`, `PlayMode`, and `EditMode`.\r\n\r\n_**required:** `false`_\r\n_**default:** `All`_\r\n\r\n#### artifactsPath\r\n\r\nPath where the test results should be stored.\r\n\r\nIn this folder a folder will be created for every test mode.\r\n\r\n_**required:** `false`_\r\n_**default:** `artifacts`_\r\n\r\n#### useHostNetwork\r\n\r\nInitializes Docker using the host network.\r\n\r\nThis is useful if Unity needs to access a local server that was started as part of your workflow.\r\n\r\nOptions are: \"true\", \"false\"\r\n\r\n_**required:** `false`_\r\n_**default:** `false`_\r\n\r\n#### sshAgent\r\n\r\nSSH Agent path to forward to the container.\r\n\r\nThis is useful if your manifest has a dependency on a private GitHub repo.\r\n\r\n_**required:** `false`_\r\n_**default:** ``_\r\n\r\n#### gitPrivateToken\r\n\r\nGitHub Private Access Token (PAT) to pull from GitHub.\r\n\r\nThis is useful if your manifest has a dependency on a private GitHub repo.\r\n\r\n_**required:** `false`_\r\n_**default:** ``_\r\n\r\n#### githubToken\r\n\r\nToken to authorize access to the GitHub REST API. If provided, a check run will be created with the test results.\r\n\r\nIt is recommended to use `githubToken: ${{ secrets.GITHUB_TOKEN }}`,\r\nbut creating the check from [a fork of your repo](https://docs.github.com/en/actions/reference/authentication-in-a-workflow#permissions-for-the-github_token)\r\nmay require using a [Personal Access Token](https://docs.github.com/en/github/authenticating-to-github/creating-a-personal-access-token#creating-a-token).\r\n\r\nReference the [GitHub Checks API docs](https://docs.github.com/en/rest/reference/checks)\r\nfor details on [creating CI tests with the Checks API](https://docs.github.com/en/developers/apps/creating-ci-tests-with-the-checks-api).\r\n\r\n_**required:** `false`_\r\n_**default:** ``_\r\n\r\n#### checkName\r\n\r\nName for the check run that is created when a github token is provided.\r\n\r\nIt may be useful to customize the check name if, for example, you have a job matrix with multiple unity versions.\r\n\r\n_**required:** `false`_\r\n_**default:** `Test Results`_\r\n\r\n## Complete example\r\n\r\nA complete workflow that tests all modes separately could look like this:\r\n\r\n```yaml\r\nname: Test project\r\n\r\non: [push, pull_request]\r\n\r\njobs:\r\n  testAllModes:\r\n    name: Test in ${{ matrix.testMode }}\r\n    runs-on: ubuntu-latest\r\n    strategy:\r\n      fail-fast: false\r\n      matrix:\r\n        projectPath:\r\n          - test-project\r\n        testMode:\r\n          - playmode\r\n          - editmode\r\n    steps:\r\n      - uses: actions/checkout@v2\r\n        with:\r\n          lfs: true\r\n      - uses: actions/cache@v2\r\n        with:\r\n          path: ${{ matrix.projectPath }}/Library\r\n          key: Library-${{ matrix.projectPath }}\r\n          restore-keys: |\r\n            Library-\r\n      - uses: game-ci/unity-test-runner@v2\r\n        id: tests\r\n        env:\r\n          UNITY_LICENSE: ${{ secrets.UNITY_LICENSE }}\r\n        with:\r\n          projectPath: ${{ matrix.projectPath }}\r\n          testMode: ${{ matrix.testMode }}\r\n          artifactsPath: ${{ matrix.testMode }}-artifacts\r\n          githubToken: ${{ secrets.GITHUB_TOKEN }}\r\n          checkName: ${{ matrix.testMode }} Test Results\r\n      - uses: actions/upload-artifact@v2\r\n        if: always()\r\n        with:\r\n          name: Test results for ${{ matrix.testMode }}\r\n          path: ${{ steps.tests.outputs.artifactsPath }}\r\n```\r\n");

/***/ })

};;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9kb2NzL2dpdGh1Yi92Mi8wMy10ZXN0LXJ1bm5lci5tZCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBO0FBQWUsNDJCQUE2eUIseUJBQXlCLDRFQUE0RSx3QkFBd0IsMGJBQTBiLHVCQUF1QiwyQkFBMkIsMEJBQTBCLHlCQUF5Qix3QkFBd0IsNEVBQTRFLHdCQUF3Qiw2cEJBQTZwQix3QkFBd0Isb2pDQUFvakMsMENBQTBDLDQxR0FBNDFHLHdCQUF3QiwwbUNBQTBtQyxtQkFBbUIsd1hBQXdYLHNCQUFzQixzQ0FBc0Msc0JBQXNCLHdLQUF3Syx5QkFBeUIsK0NBQStDLHNCQUFzQiwyQkFBMkIsbUJBQW1CLGdDQUFnQyxtQkFBbUIsd0NBQXdDLHdCQUF3Qiw0QkFBNEIsbUJBQW1CLDBJQUEwSSxtQkFBbUIsdUJBQXVCLHFDQUFxQyxZQUFZLEUiLCJmaWxlIjoiMjYuanMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCBcIiMgVGVzdCBydW5uZXJcXHJcXG5cXHJcXG5SdW5uaW5nIHlvdXIgdGVzdCBzdWl0ZSBpbiBhbiBhdXRvbWF0ZWQgd29ya2Zsb3cgaGVscHMgaW5jcmVhc2UgY2VydGFpbnR5IHdoZW4gbWVyZ2luZy5cXHJcXG5cXHJcXG5Vc2UgW1VuaXR5IC0gVGVzdCBydW5uZXJdKGh0dHBzOi8vZ2l0aHViLmNvbS9tYXJrZXRwbGFjZS9hY3Rpb25zL3VuaXR5LXRlc3QtcnVubmVyKSB0byBydW4geW91ciBVbml0eSB0ZXN0cy5cXHJcXG5cXHJcXG4jIyBCYXNpYyBzZXR1cFxcclxcblxcclxcbkJ5IGRlZmF1bHQsIHRoZSB0ZXN0IHJ1bm5lciB3aWxsIHJ1biBib3RoIGBwbGF5bW9kZWAgYW5kIGBlZGl0bW9kZWAgdGVzdHMuXFxyXFxuXFxyXFxuQ3JlYXRlIG9yIGVkaXQgdGhlIGZpbGUgY2FsbGVkIGAuZ2l0aHViL3dvcmtmbG93cy9tYWluLnltbGAgYW5kIGFkZCBhIGpvYiB0byBpdC5cXHJcXG5cXHJcXG4jIyMjIFBlcnNvbmFsIGxpY2Vuc2VcXHJcXG5cXHJcXG5QZXJzb25hbCBsaWNlbnNlcyByZXF1aXJlIGEgb25lLXRpbWUgbWFudWFsIGFjdGl2YXRpb24gc3RlcC5cXHJcXG5cXHJcXG5NYWtlIHN1cmUgeW91XFxyXFxuW2FjcXVpcmUgYW5kIGFjdGl2YXRlXShodHRwczovL2dpdGh1Yi5jb20vbWFya2V0cGxhY2UvYWN0aW9ucy91bml0eS1yZXF1ZXN0LWFjdGl2YXRpb24tZmlsZSlcXHJcXG55b3VyIGxpY2Vuc2UgZmlsZSBhbmQgYWRkIGl0IGFzIGEgc2VjcmV0LlxcclxcblxcclxcblRoZW4sIGRlZmluZSB0aGUgdGVzdCBzdGVwIGFzIGZvbGxvd3M6XFxyXFxuXFxyXFxuYGBgeWFtbFxcclxcbi0gdXNlczogZ2FtZS1jaS91bml0eS10ZXN0LXJ1bm5lckB2MlxcclxcbiAgZW52OlxcclxcbiAgICBVTklUWV9MSUNFTlNFOiAke3sgc2VjcmV0cy5VTklUWV9MSUNFTlNFIH19XFxyXFxuICB3aXRoOlxcclxcbiAgICBwcm9qZWN0UGF0aDogcGF0aC90by95b3VyL3Byb2plY3RcXHJcXG4gICAgZ2l0aHViVG9rZW46ICR7eyBzZWNyZXRzLkdJVEhVQl9UT0tFTiB9fVxcclxcbmBgYFxcclxcblxcclxcbiMjIyMgUHJvZmVzc2lvbmFsIGxpY2Vuc2VcXHJcXG5cXHJcXG5NYWtlIHN1cmUgeW91IGhhdmUgc2V0IHVwIHRoZXNlIHZhcmlhYmxlcyBpbiB0aGUgYWN0aXZhdGlvbiBzdGVwLlxcclxcblxcclxcbi0gYFVOSVRZX0VNQUlMYCAoc2hvdWxkIGNvbnRhaW4gdGhlIGVtYWlsIGFkZHJlc3MgZm9yIHlvdXIgVW5pdHkgYWNjb3VudClcXHJcXG4tIGBVTklUWV9QQVNTV09SRGAgKHRoZSBwYXNzd29yZCB0aGF0IHlvdSB1c2UgdG8gbG9naW4gdG8gVW5pdHkpXFxyXFxuLSBgVU5JVFlfU0VSSUFMYCAodGhlIHNlcmlhbCBwcm92aWRlZCBieSBVbml0eSlcXHJcXG5cXHJcXG5EZWZpbmUgdGhlIHRlc3Qgc3RlcCBhcyBmb2xsb3dzOlxcclxcblxcclxcbmBgYHlhbWxcXHJcXG4tIHVzZXM6IGdhbWUtY2kvdW5pdHktdGVzdC1ydW5uZXJAdjJcXHJcXG4gIGVudjpcXHJcXG4gICAgVU5JVFlfRU1BSUw6ICR7eyBzZWNyZXRzLlVOSVRZX0VNQUlMIH19XFxyXFxuICAgIFVOSVRZX1BBU1NXT1JEOiAke3sgc2VjcmV0cy5VTklUWV9QQVNTV09SRCB9fVxcclxcbiAgICBVTklUWV9TRVJJQUw6ICR7eyBzZWNyZXRzLlVOSVRZX1NFUklBTCB9fVxcclxcbiAgd2l0aDpcXHJcXG4gICAgcHJvamVjdFBhdGg6IHBhdGgvdG8veW91ci9wcm9qZWN0XFxyXFxuICAgIGdpdGh1YlRva2VuOiAke3sgc2VjcmV0cy5HSVRIVUJfVE9LRU4gfX1cXHJcXG5gYGBcXHJcXG5cXHJcXG5UaGF0IGlzIGFsbCB5b3UgbmVlZCB0byB0ZXN0IHlvdXIgcHJvamVjdC5cXHJcXG5cXHJcXG4jIyBWaWV3aW5nIHRlc3QgcmVzdWx0c1xcclxcblxcclxcblRoZSB0ZXN0IHJlc3VsdHMgY2FuIGJlIHZpZXdlZCBmcm9tIGEgW0dpdEh1YiBTdGF0dXMgQ2hlY2tdKGh0dHBzOi8vZG9jcy5naXRodWIuY29tL2VuL2dpdGh1Yi9jb2xsYWJvcmF0aW5nLXdpdGgtaXNzdWVzLWFuZC1wdWxsLXJlcXVlc3RzL2Fib3V0LXN0YXR1cy1jaGVja3MpLlxcclxcblxcclxcblRvIGdldCB0aGlzIGZ1bmN0aW9uYWxpdHksIHNpbXBseSBwcm92aWRlIHRoZSBbR2l0SHViIFRva2VuXShodHRwczovL2RvY3MuZ2l0aHViLmNvbS9lbi9hY3Rpb25zL3JlZmVyZW5jZS9hdXRoZW50aWNhdGlvbi1pbi1hLXdvcmtmbG93I2Fib3V0LXRoZS1naXRodWJfdG9rZW4tc2VjcmV0KVxcclxcbmluIG9yZGVyIHRvIHZpZXcgdGhlIHRlc3RzIHJlc3VsdHMgZnJvbSBbYSBjaGVjayBydW5dKGh0dHBzOi8vZG9jcy5naXRodWIuY29tL2VuL3Jlc3QvZ3VpZGVzL2dldHRpbmctc3RhcnRlZC13aXRoLXRoZS1jaGVja3MtYXBpI2Fib3V0LWNoZWNrLXJ1bnMpLlxcclxcblxcclxcbmBgYHlhbWxcXHJcXG4tIHVzZXM6IGdhbWUtY2kvdW5pdHktdGVzdC1ydW5uZXJAdjJcXHJcXG4gIHdpdGg6XFxyXFxuICAgIGdpdGh1YlRva2VuOiAke3sgc2VjcmV0cy5HSVRIVUJfVE9LRU4gfX1cXHJcXG5gYGBcXHJcXG5cXHJcXG5JZiB5b3UgY2hvb3NlIG5vdCB0byBwcm92aWRlIHRoZSBgZ2l0aHViVG9rZW5gLCB5b3UgbWF5IHN0aWxsIHVwbG9hZCB0aGUgYXJ0aWZhY3RzIGluIG9yZGVyIHRvIGFjY2VzcyB0aGVtLlxcclxcblxcclxcbiMjIFN0b3JpbmcgdGVzdCByZXN1bHRzXFxyXFxuXFxyXFxuVG8gYmUgYWJsZSB0byBhY2Nlc3MgdGhlIHRlc3QgcmVzdWx0cywgdGhleSBuZWVkIHRvIGJlIHVwbG9hZGVkIGFzIGFydGlmYWN0cy5cXHJcXG5cXHJcXG5UbyBkbyB0aGlzLCBpdCBpcyByZWNvbW1lbmRlZCB0byB1c2UgdGhlIG9mZmljaWFsIEdpdGh1YiBBY3Rpb25zXFxyXFxuW3VwbG9hZCBhcnRpZmFjdCBhY3Rpb25dKGh0dHBzOi8vZ2l0aHViLmNvbS9tYXJrZXRwbGFjZS9hY3Rpb25zL3VwbG9hZC1hLWJ1aWxkLWFydGlmYWN0KS5cXHJcXG5cXHJcXG5CeSBkZWZhdWx0LCBUZXN0IFJ1bm5lciBvdXRwdXRzIGl0cyByZXN1bHRzIHRvIGEgZm9sZGVyIG5hbWVkIGBhcnRpZmFjdHNgLlxcclxcblxcclxcbmBgYHlhbWxcXHJcXG4tIHVzZXM6IGFjdGlvbnMvdXBsb2FkLWFydGlmYWN0QHYyXFxyXFxuICBpZjogYWx3YXlzKClcXHJcXG4gIHdpdGg6XFxyXFxuICAgIG5hbWU6IFRlc3QgcmVzdWx0c1xcclxcbiAgICBwYXRoOiBhcnRpZmFjdHNcXHJcXG5gYGBcXHJcXG5cXHJcXG5UZXN0IHJlc3VsdHMgY2FuIG5vdyBiZSBkb3dubG9hZGVkIGFzIGBBcnRpZmFjdHNgIGluIHRoZSBgQWN0aW9uc2AgdGFiLlxcclxcblxcclxcbiMjIyMgU3BlY2lmeWluZyBhcnRpZmFjdHMgZm9sZGVyXFxyXFxuXFxyXFxuWW91IGNhbiBzcGVjaWZ5IGEgZGlmZmVyZW50IGBhcnRpZmFjdHNQYXRoYCBpbiB0aGUgdGVzdCBydW5uZXIgYW5kIHJlZmVyZW5jZSB0aGlzIHBhdGggdXNpbmcgdGhlIGBpZGAgb2YgdGhlIHRlc3Qgc3RlcC5cXHJcXG5cXHJcXG5gYGB5YW1sXFxyXFxuLSB1c2VzOiBnYW1lLWNpL3VuaXR5LXRlc3QtcnVubmVyQHYyXFxyXFxuICBpZDogbXlUZXN0U3RlcFxcclxcbmBgYFxcclxcblxcclxcbmBgYHlhbWxcXHJcXG4tIHVzZXM6IGFjdGlvbnMvdXBsb2FkLWFydGlmYWN0QHYyXFxyXFxuICBpZjogYWx3YXlzKClcXHJcXG4gIHdpdGg6XFxyXFxuICAgIG5hbWU6IFRlc3QgcmVzdWx0c1xcclxcbiAgICBwYXRoOiAke3sgc3RlcHMubXlUZXN0U3RlcC5vdXRwdXRzLmFydGlmYWN0c1BhdGggfX1cXHJcXG5gYGBcXHJcXG5cXHJcXG4jIyBDYWNoaW5nXFxyXFxuXFxyXFxuSW4gb3JkZXIgdG8gbWFrZSB0ZXN0IHJ1bnMgKGFuZCBidWlsZHMpIGZhc3RlcixcXHJcXG55b3UgY2FuIGNhY2hlIExpYnJhcnkgZmlsZXMgZnJvbSBwcmV2aW91cyBydW5zLlxcclxcblxcclxcblRvIGRvIHNvLCBzaW1wbHkgYWRkIEdpdGh1YiBBY3Rpb25zJyBvZmZpY2lhbFxcclxcbltjYWNoZSBhY3Rpb25dKGh0dHBzOi8vZ2l0aHViLmNvbS9tYXJrZXRwbGFjZS9hY3Rpb25zL2NhY2hlKVxcclxcbmJlZm9yZSBhbnkgdW5pdHkgc3RlcHMuXFxyXFxuXFxyXFxuYGBgeWFtbFxcclxcbi0gdXNlczogYWN0aW9ucy9jYWNoZUB2MlxcclxcbiAgd2l0aDpcXHJcXG4gICAgcGF0aDogcGF0aC90by95b3VyL3Byb2plY3QvTGlicmFyeVxcclxcbiAgICBrZXk6IExpYnJhcnktTXlQcm9qZWN0TmFtZS1UYXJnZXRQbGF0Zm9ybVxcclxcbiAgICByZXN0b3JlLWtleXM6IHxcXHJcXG4gICAgICBMaWJyYXJ5LU15UHJvamVjdE5hbWUtXFxyXFxuICAgICAgTGlicmFyeS1cXHJcXG5gYGBcXHJcXG5cXHJcXG5UaGlzIHNpbXBsZSBhZGRpdGlvbiBjb3VsZCBzcGVlZCB1cCB5b3VyIHRlc3QgcnVucyBieSBtb3JlIHRoYW4gNTAlLlxcclxcblxcclxcbiMjIENvbmZpZ3VyYXRpb24gb3B0aW9uc1xcclxcblxcclxcbkJlbG93IG9wdGlvbnMgY2FuIGJlIHNwZWNpZmllZCB1bmRlciBgd2l0aDpgIGZvciB0aGUgYHVuaXR5LXRlc3QtcnVubmVyYCBhY3Rpb24uXFxyXFxuXFxyXFxuIyMjIyB1bml0eVZlcnNpb25cXHJcXG5cXHJcXG5WZXJzaW9uIG9mIFVuaXR5IHRvIHVzZSBmb3IgdGVzdGluZyB0aGUgcHJvamVjdC5cXHJcXG5Vc2UgXFxcImF1dG9cXFwiIHRvIGdldCBmcm9tIHlvdXIgUHJvamVjdFNldHRpbmdzL1Byb2plY3RWZXJzaW9uLnR4dFxcclxcblxcclxcbl8qKnJlcXVpcmVkOioqIGBmYWxzZWBfXFxyXFxuXyoqZGVmYXVsdDoqKiBgYXV0b2BfXFxyXFxuXFxyXFxuIyMjIyBjdXN0b21JbWFnZVxcclxcblxcclxcblNwZWNpZmljIGRvY2tlciBpbWFnZSB0aGF0IHNob3VsZCBiZSB1c2VkIGZvciB0ZXN0aW5nIHRoZSBwcm9qZWN0LlxcclxcblxcclxcbmBgYHlhbWxcXHJcXG4tIHVzZXM6IGdhbWUtY2kvdW5pdHktdGVzdC1ydW5uZXJAdjJcXHJcXG4gIHdpdGg6XFxyXFxuICAgIGN1c3RvbUltYWdlOiAndW5pdHljaS9lZGl0b3I6MjAyMC4xLjE0ZjEtYmFzZS0wJ1xcclxcbmBgYFxcclxcblxcclxcbl8qKnJlcXVpcmVkOioqIGBmYWxzZWBfXFxyXFxuXyoqZGVmYXVsdDoqKiBgXFxcIlxcXCJgX1xcclxcblxcclxcbiMjIyMgcHJvamVjdFBhdGhcXHJcXG5cXHJcXG5TcGVjaWZ5IHRoZSBwYXRoIHRvIHlvdXIgVW5pdHkgcHJvamVjdCB0byBiZSB0ZXN0ZWQuXFxyXFxuVGhlIHBhdGggc2hvdWxkIGJlIHJlbGF0aXZlIHRvIHRoZSByb290IG9mIHlvdXIgcHJvamVjdC5cXHJcXG5cXHJcXG5fKipyZXF1aXJlZDoqKiBgZmFsc2VgX1xcclxcbl8qKmRlZmF1bHQ6KiogYDx5b3VyIHByb2plY3Qgcm9vdD5gX1xcclxcblxcclxcbiMjIyMgY3VzdG9tUGFyYW1ldGVyc1xcclxcblxcclxcbkN1c3RvbSBwYXJhbWV0ZXJzIHRvIGNvbmZpZ3VyZSB0aGUgdGVzdCBydW5uZXIuXFxyXFxuXFxyXFxuRm9yIGV4YW1wbGUsIHlvdSBtYXkgcmVmZXIgdG8gdGhlIFtVbml0eSBUZXN0IEZyYW1ld29yayBjb21tYW5kIGxpbmUgYXJndW1lbnRzXShodHRwczovL2RvY3MudW5pdHkzZC5jb20vUGFja2FnZXMvY29tLnVuaXR5LnRlc3QtZnJhbWV3b3JrQDIuMC9tYW51YWwvcmVmZXJlbmNlLWNvbW1hbmQtbGluZS5odG1sKSBmb3Igb3B0aW9ucyB0aGF0IGNvdWxkIGhlbHAgd2l0aCBjb25maWd1cmluZyB5b3VyIHRlc3RzLlxcclxcblxcclxcblBhcmFtZXRlcnMgbXVzdCBzdGFydCB3aXRoIGEgaHlwaGVuIChgLWApIGFuZCBtYXkgYmUgZm9sbG93ZWQgYnkgYSB2YWx1ZSAod2l0aG91dCBoeXBoZW4pLlxcclxcblxcclxcblBhcmFtZXRlcnMgd2l0aG91dCBhIHZhbHVlIHdpbGwgYmUgY29uc2lkZXJlZCBib29sZWFucyAod2l0aCBhIHZhbHVlIG9mIHRydWUpLlxcclxcblxcclxcbmBgYHlhbWxcXHJcXG4tIHVzZXM6IGdhbWUtY2kvdW5pdHktdGVzdC1ydW5uZXJAdjJcXHJcXG4gIHdpdGg6XFxyXFxuICAgIGN1c3RvbVBhcmFtZXRlcnM6IC1wcm9maWxlIFNvbWVQcm9maWxlIC1zb21lQm9vbGVhbiAtc29tZVZhbHVlIGV4YW1wbGVWYWx1ZVxcclxcbmBgYFxcclxcblxcclxcbl8qKnJlcXVpcmVkOioqIGBmYWxzZWBfXFxyXFxuXyoqZGVmYXVsdDoqKiBgXFxcIlxcXCJgX1xcclxcblxcclxcbiMjIyMgdGVzdE1vZGVcXHJcXG5cXHJcXG5UaGUgdHlwZSBvZiB0ZXN0cyB0byBiZSBydW4gYnkgdGhlIHRlc3QgcnVubmVyLlxcclxcblxcclxcbk9wdGlvbnMgYXJlOiBgQWxsYCwgYFBsYXlNb2RlYCwgYW5kIGBFZGl0TW9kZWAuXFxyXFxuXFxyXFxuXyoqcmVxdWlyZWQ6KiogYGZhbHNlYF9cXHJcXG5fKipkZWZhdWx0OioqIGBBbGxgX1xcclxcblxcclxcbiMjIyMgYXJ0aWZhY3RzUGF0aFxcclxcblxcclxcblBhdGggd2hlcmUgdGhlIHRlc3QgcmVzdWx0cyBzaG91bGQgYmUgc3RvcmVkLlxcclxcblxcclxcbkluIHRoaXMgZm9sZGVyIGEgZm9sZGVyIHdpbGwgYmUgY3JlYXRlZCBmb3IgZXZlcnkgdGVzdCBtb2RlLlxcclxcblxcclxcbl8qKnJlcXVpcmVkOioqIGBmYWxzZWBfXFxyXFxuXyoqZGVmYXVsdDoqKiBgYXJ0aWZhY3RzYF9cXHJcXG5cXHJcXG4jIyMjIHVzZUhvc3ROZXR3b3JrXFxyXFxuXFxyXFxuSW5pdGlhbGl6ZXMgRG9ja2VyIHVzaW5nIHRoZSBob3N0IG5ldHdvcmsuXFxyXFxuXFxyXFxuVGhpcyBpcyB1c2VmdWwgaWYgVW5pdHkgbmVlZHMgdG8gYWNjZXNzIGEgbG9jYWwgc2VydmVyIHRoYXQgd2FzIHN0YXJ0ZWQgYXMgcGFydCBvZiB5b3VyIHdvcmtmbG93Llxcclxcblxcclxcbk9wdGlvbnMgYXJlOiBcXFwidHJ1ZVxcXCIsIFxcXCJmYWxzZVxcXCJcXHJcXG5cXHJcXG5fKipyZXF1aXJlZDoqKiBgZmFsc2VgX1xcclxcbl8qKmRlZmF1bHQ6KiogYGZhbHNlYF9cXHJcXG5cXHJcXG4jIyMjIHNzaEFnZW50XFxyXFxuXFxyXFxuU1NIIEFnZW50IHBhdGggdG8gZm9yd2FyZCB0byB0aGUgY29udGFpbmVyLlxcclxcblxcclxcblRoaXMgaXMgdXNlZnVsIGlmIHlvdXIgbWFuaWZlc3QgaGFzIGEgZGVwZW5kZW5jeSBvbiBhIHByaXZhdGUgR2l0SHViIHJlcG8uXFxyXFxuXFxyXFxuXyoqcmVxdWlyZWQ6KiogYGZhbHNlYF9cXHJcXG5fKipkZWZhdWx0OioqIGBgX1xcclxcblxcclxcbiMjIyMgZ2l0UHJpdmF0ZVRva2VuXFxyXFxuXFxyXFxuR2l0SHViIFByaXZhdGUgQWNjZXNzIFRva2VuIChQQVQpIHRvIHB1bGwgZnJvbSBHaXRIdWIuXFxyXFxuXFxyXFxuVGhpcyBpcyB1c2VmdWwgaWYgeW91ciBtYW5pZmVzdCBoYXMgYSBkZXBlbmRlbmN5IG9uIGEgcHJpdmF0ZSBHaXRIdWIgcmVwby5cXHJcXG5cXHJcXG5fKipyZXF1aXJlZDoqKiBgZmFsc2VgX1xcclxcbl8qKmRlZmF1bHQ6KiogYGBfXFxyXFxuXFxyXFxuIyMjIyBnaXRodWJUb2tlblxcclxcblxcclxcblRva2VuIHRvIGF1dGhvcml6ZSBhY2Nlc3MgdG8gdGhlIEdpdEh1YiBSRVNUIEFQSS4gSWYgcHJvdmlkZWQsIGEgY2hlY2sgcnVuIHdpbGwgYmUgY3JlYXRlZCB3aXRoIHRoZSB0ZXN0IHJlc3VsdHMuXFxyXFxuXFxyXFxuSXQgaXMgcmVjb21tZW5kZWQgdG8gdXNlIGBnaXRodWJUb2tlbjogJHt7IHNlY3JldHMuR0lUSFVCX1RPS0VOIH19YCxcXHJcXG5idXQgY3JlYXRpbmcgdGhlIGNoZWNrIGZyb20gW2EgZm9yayBvZiB5b3VyIHJlcG9dKGh0dHBzOi8vZG9jcy5naXRodWIuY29tL2VuL2FjdGlvbnMvcmVmZXJlbmNlL2F1dGhlbnRpY2F0aW9uLWluLWEtd29ya2Zsb3cjcGVybWlzc2lvbnMtZm9yLXRoZS1naXRodWJfdG9rZW4pXFxyXFxubWF5IHJlcXVpcmUgdXNpbmcgYSBbUGVyc29uYWwgQWNjZXNzIFRva2VuXShodHRwczovL2RvY3MuZ2l0aHViLmNvbS9lbi9naXRodWIvYXV0aGVudGljYXRpbmctdG8tZ2l0aHViL2NyZWF0aW5nLWEtcGVyc29uYWwtYWNjZXNzLXRva2VuI2NyZWF0aW5nLWEtdG9rZW4pLlxcclxcblxcclxcblJlZmVyZW5jZSB0aGUgW0dpdEh1YiBDaGVja3MgQVBJIGRvY3NdKGh0dHBzOi8vZG9jcy5naXRodWIuY29tL2VuL3Jlc3QvcmVmZXJlbmNlL2NoZWNrcylcXHJcXG5mb3IgZGV0YWlscyBvbiBbY3JlYXRpbmcgQ0kgdGVzdHMgd2l0aCB0aGUgQ2hlY2tzIEFQSV0oaHR0cHM6Ly9kb2NzLmdpdGh1Yi5jb20vZW4vZGV2ZWxvcGVycy9hcHBzL2NyZWF0aW5nLWNpLXRlc3RzLXdpdGgtdGhlLWNoZWNrcy1hcGkpLlxcclxcblxcclxcbl8qKnJlcXVpcmVkOioqIGBmYWxzZWBfXFxyXFxuXyoqZGVmYXVsdDoqKiBgYF9cXHJcXG5cXHJcXG4jIyMjIGNoZWNrTmFtZVxcclxcblxcclxcbk5hbWUgZm9yIHRoZSBjaGVjayBydW4gdGhhdCBpcyBjcmVhdGVkIHdoZW4gYSBnaXRodWIgdG9rZW4gaXMgcHJvdmlkZWQuXFxyXFxuXFxyXFxuSXQgbWF5IGJlIHVzZWZ1bCB0byBjdXN0b21pemUgdGhlIGNoZWNrIG5hbWUgaWYsIGZvciBleGFtcGxlLCB5b3UgaGF2ZSBhIGpvYiBtYXRyaXggd2l0aCBtdWx0aXBsZSB1bml0eSB2ZXJzaW9ucy5cXHJcXG5cXHJcXG5fKipyZXF1aXJlZDoqKiBgZmFsc2VgX1xcclxcbl8qKmRlZmF1bHQ6KiogYFRlc3QgUmVzdWx0c2BfXFxyXFxuXFxyXFxuIyMgQ29tcGxldGUgZXhhbXBsZVxcclxcblxcclxcbkEgY29tcGxldGUgd29ya2Zsb3cgdGhhdCB0ZXN0cyBhbGwgbW9kZXMgc2VwYXJhdGVseSBjb3VsZCBsb29rIGxpa2UgdGhpczpcXHJcXG5cXHJcXG5gYGB5YW1sXFxyXFxubmFtZTogVGVzdCBwcm9qZWN0XFxyXFxuXFxyXFxub246IFtwdXNoLCBwdWxsX3JlcXVlc3RdXFxyXFxuXFxyXFxuam9iczpcXHJcXG4gIHRlc3RBbGxNb2RlczpcXHJcXG4gICAgbmFtZTogVGVzdCBpbiAke3sgbWF0cml4LnRlc3RNb2RlIH19XFxyXFxuICAgIHJ1bnMtb246IHVidW50dS1sYXRlc3RcXHJcXG4gICAgc3RyYXRlZ3k6XFxyXFxuICAgICAgZmFpbC1mYXN0OiBmYWxzZVxcclxcbiAgICAgIG1hdHJpeDpcXHJcXG4gICAgICAgIHByb2plY3RQYXRoOlxcclxcbiAgICAgICAgICAtIHRlc3QtcHJvamVjdFxcclxcbiAgICAgICAgdGVzdE1vZGU6XFxyXFxuICAgICAgICAgIC0gcGxheW1vZGVcXHJcXG4gICAgICAgICAgLSBlZGl0bW9kZVxcclxcbiAgICBzdGVwczpcXHJcXG4gICAgICAtIHVzZXM6IGFjdGlvbnMvY2hlY2tvdXRAdjJcXHJcXG4gICAgICAgIHdpdGg6XFxyXFxuICAgICAgICAgIGxmczogdHJ1ZVxcclxcbiAgICAgIC0gdXNlczogYWN0aW9ucy9jYWNoZUB2MlxcclxcbiAgICAgICAgd2l0aDpcXHJcXG4gICAgICAgICAgcGF0aDogJHt7IG1hdHJpeC5wcm9qZWN0UGF0aCB9fS9MaWJyYXJ5XFxyXFxuICAgICAgICAgIGtleTogTGlicmFyeS0ke3sgbWF0cml4LnByb2plY3RQYXRoIH19XFxyXFxuICAgICAgICAgIHJlc3RvcmUta2V5czogfFxcclxcbiAgICAgICAgICAgIExpYnJhcnktXFxyXFxuICAgICAgLSB1c2VzOiBnYW1lLWNpL3VuaXR5LXRlc3QtcnVubmVyQHYyXFxyXFxuICAgICAgICBpZDogdGVzdHNcXHJcXG4gICAgICAgIGVudjpcXHJcXG4gICAgICAgICAgVU5JVFlfTElDRU5TRTogJHt7IHNlY3JldHMuVU5JVFlfTElDRU5TRSB9fVxcclxcbiAgICAgICAgd2l0aDpcXHJcXG4gICAgICAgICAgcHJvamVjdFBhdGg6ICR7eyBtYXRyaXgucHJvamVjdFBhdGggfX1cXHJcXG4gICAgICAgICAgdGVzdE1vZGU6ICR7eyBtYXRyaXgudGVzdE1vZGUgfX1cXHJcXG4gICAgICAgICAgYXJ0aWZhY3RzUGF0aDogJHt7IG1hdHJpeC50ZXN0TW9kZSB9fS1hcnRpZmFjdHNcXHJcXG4gICAgICAgICAgZ2l0aHViVG9rZW46ICR7eyBzZWNyZXRzLkdJVEhVQl9UT0tFTiB9fVxcclxcbiAgICAgICAgICBjaGVja05hbWU6ICR7eyBtYXRyaXgudGVzdE1vZGUgfX0gVGVzdCBSZXN1bHRzXFxyXFxuICAgICAgLSB1c2VzOiBhY3Rpb25zL3VwbG9hZC1hcnRpZmFjdEB2MlxcclxcbiAgICAgICAgaWY6IGFsd2F5cygpXFxyXFxuICAgICAgICB3aXRoOlxcclxcbiAgICAgICAgICBuYW1lOiBUZXN0IHJlc3VsdHMgZm9yICR7eyBtYXRyaXgudGVzdE1vZGUgfX1cXHJcXG4gICAgICAgICAgcGF0aDogJHt7IHN0ZXBzLnRlc3RzLm91dHB1dHMuYXJ0aWZhY3RzUGF0aCB9fVxcclxcbmBgYFxcclxcblwiOyJdLCJzb3VyY2VSb290IjoiIn0=