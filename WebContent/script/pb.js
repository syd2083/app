	var pb = angular.module('pb', []).controller('pbController',
			function($scope, $window) {
				$scope.pgVO = {
					"buttons" : [ -25, -10, +25, +10 ],
					"bars" : [ 10, 15, 20 ],
					"limit" : 230
				}
				$scope.pBar0 = getProgressBar($scope, 0, 0, "true");
				$scope.pBar1 = getProgressBar($scope, 0, 1, "true");
				$scope.pBar2 = getProgressBar($scope, 0, 2, "true");
				$scope.counter = 0;
				$scope.callProgress = function(index, id) {
					
					if (id == 0) {
						$scope.pBar0 = getProgressBar($scope, index, id, "false");
					}
					else if (id == 1) {
						$scope.pBar1 = getProgressBar($scope, index, id, "false");
					}
					else if (id == 2) {
						$scope.pBar2 = getProgressBar($scope, index, id, "false");
					}
				};

				$scope.closeWindow = function() {
					$window.close();
				}
				
				function getProgressBar($scope, index, id, start) {
					var barColor = "#87CEFA";
					var btnValue = $scope.pgVO.buttons[index];
					var barValue = $scope.pgVO.bars[id];
					var pbWidth = start == "true" ? barValue : barValue + btnValue;
					$scope.pgVO.bars[id] = pbWidth;
					if (pbWidth <= 0) {
						pbWidth = 0;
						$scope.pgVO.bars[id] = 0;
					} else if (pbWidth > 100) {
						pbWidth = 100;
						barColor = "#FF4500";
					} 
					pbWidth = pbWidth+"%";
					return {
				        	"position": "absolute",
							"width": pbWidth,
							"height": "30px",
							"background-color": barColor,
					    };
				}
			});

	pb.directive('ngConfirmClick', [ function() {
		return {
			link : function(scope, element, attr) {
				var msg = attr.ngConfirmClick || "Are you sure?";
				var clickAction = attr.confirmedClick;
				element.bind('click', function(event) {
					if (window.confirm(msg)) {
						scope.$eval(clickAction)
					}
				});
			}
		};
	} ])
	
	