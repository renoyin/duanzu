'use strict';

//Duanzuposts service used to communicate Duanzuposts REST endpoints
angular.module('duanzuposts').factory('Duanzuposts', ['$resource',
	function($resource) {
		return $resource('duanzuposts/:duanzupostId', { duanzupostId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);