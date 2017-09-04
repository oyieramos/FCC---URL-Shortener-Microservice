// var angular = require('angular');
// angular is not defined? but the app is working tho :(
var app = angular.module('shortUrlApp', []);
//empty array is for dependencies in angular
console.log('angular app loaded...');

app.controller('shortAppCtrl', function($scope){
	console.log('Controller loaded...');
});
