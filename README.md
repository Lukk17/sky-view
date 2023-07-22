# SkyView

Front-end for Sky web application


-----------

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change
any of the source files.


----------

## Updating dependencies

Dependency version can be found on:  
https://www.npmjs.com/

When updating keep in mind that before each version of package you can insert symbol:

| Symbol | Description                                                                                                                                            |
|--------|--------------------------------------------------------------------------------------------------------------------------------------------------------|
| ^      | The project will work with any version of the dependency that is greater than or equal to the specified version.                                       |
| ~      | The project will work with any version of the dependency that is greater than or equal to the specified version, but less than the next major version. |

Safest way is to use just a version number. But then to update you need to manually change versions in `package.json`

Updating each dependency to latest:

```shell
npm update @angular/core@latest
```

To update all, change its versions in `package.json` and run
```shell
npm install
```
sometimes force install is required:
```shell
npm install --force
```

To automatically update packages (with ~ or ^ versions) and change it version in `package.json`
```shell
npm update --save
```


---------

## Adding new environment

in `angular.json` under  
`projects.sky-view.architect.build.configurations`  
add

```
"localDev": {
  "fileReplacements": [
    {
      "replace": "src/environments/environment.ts",
      "with": "src/environments/environment.localDev.ts"
    }
  ]
}
```

and under  
`projects.sky-view.architect.serve.configurations`  
add
```
"localDev": {
              "browserTarget": "sky-view:build:localDev"
            }
```

in `package.json` under `scripts` add:
```
"localDev": "ng serve --configuration=localDev --hmr"
```

---------

## Troubleshooter

`Error: Module not found: Error: Can't resolve 'path' in '<projectPath>app-root-path'"`  
run
```shell
npm install --save path-browserify 
npm install --save path 
```
add `webpack.config.js`:
```shell
module.exports = {
  resolve: {
    fallback: {
      "path": require.resolve("path-browserify")
    }
  }
};

```
-------------

`ERROR Error: NG0301`  
Clear cache:
```shell
rm .angular/cache
```
