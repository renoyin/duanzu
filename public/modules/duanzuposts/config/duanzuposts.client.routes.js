'use strict';

//Setting up route
angular.module('duanzuposts').config(['$stateProvider',
	function($stateProvider) {
		// Duanzuposts state routing
		$stateProvider.
		state('listDuanzuposts', {
			url: '/duanzuposts',
			templateUrl: 'modules/duanzuposts/views/list-duanzuposts.client.view.html'
		}).
		state('createDuanzupost', {
			url: '/duanzuposts/create',
			templateUrl: 'modules/duanzuposts/views/create-duanzupost.client.view.html'
		}).
		state('viewDuanzupost', {
			url: '/duanzuposts/:duanzupostId',
			templateUrl: 'modules/duanzuposts/views/view-duanzupost.client.view.html'
		}).
		state('editDuanzupost', {
			url: '/duanzuposts/:duanzupostId/edit',
			templateUrl: 'modules/duanzuposts/views/edit-duanzupost.client.view.html'
		});
	}
]);