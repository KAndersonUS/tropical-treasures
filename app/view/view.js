'use strict';

var viewModule = angular.module('tropicalTreasures.view', [
    'tropicalTreasures.game'
])
    .controller('viewController', function($scope, createReel, advanceReel, getLine, scoreLine) {
        $scope.reels = [];
        $scope.lastScore = 0;
        $scope.lastScoreType = "";
        $scope.activeLine = "";
        $scope.spinning = false;
      var reel1Freq = [1, 3, 2, 3, 5, 7, 7, 8, 9, 3, 13, 3],
          reel2Freq = [1, 1, 1, 2, 2, 3, 3, 8, 9, 14, 16, 4],
          reel3Freq = [1, 1, 1, 2, 2, 3, 3, 5, 6, 12, 26, 2];
          $scope.reels.push(createReel(reel1Freq));
          $scope.reels.push(createReel(reel2Freq));
          $scope.reels.push(createReel(reel3Freq));

      $scope.spin = function (line) {
        if ($scope.spinning) {
          return;
        }
        $scope.activeLine = line;
        $scope.spinning = true;
        playAudio("spinning");
        var reel0Interval = setInterval(function () {
            $scope.reels[0] = advanceReel($scope.reels[0]);
            $scope.$apply();
        }, 75);
        var reel1Interval = setInterval(function () {
            $scope.reels[1] = advanceReel($scope.reels[1]);
            $scope.$apply();
        }, 75);
        var reel2Interval = setInterval(function () {
          $scope.reels[2] = advanceReel($scope.reels[2]);
          $scope.$apply();
        }, 75);
        setTimeout(function () {
          clearInterval(reel0Interval);
        }, 1300);
        setTimeout(function () {
          clearInterval(reel1Interval);
        }, 1690);
        setTimeout(function () {
          clearInterval(reel2Interval);
          $scope.lastScore = scoreLine(getLine($scope.reels, $scope.activeLine));
          $scope.spinning = false;
          setTimeout(function () {
            if (!$scope.spinning) {
              $scope.activeLine = "";
              $scope.$apply();
            }
          }, 3000);
          if ($scope.lastScore > 25) {
            $scope.lastScoreType = "Huge Win!";
          } else if ($scope.lastScore > 5) {
            $scope.lastScoreType = "Big Win!";
          } else if ($scope.lastScore > 1) {
            $scope.lastScoreType = "Mediocre Win!";
          } else if ($scope.lastScore > 0) {
            $scope.lastScoreType = "Net Zero!"
          } else {
            $scope.lastScoreType = "No win :("
          }
          if ($scope.lastScore) {
            playAudio("payoff");
          }
          $scope.$apply();
        }, 2395);
      }
    });

viewModule.directive('window', function () {
  return {
    templateUrl : 'components/window/window.html',

    scope : {
      reels : "=",
      activeLine : "="
    }
  }
});

viewModule.directive('symbol', function () {
  return {
    templateUrl : 'components/window/symbol.html',
    scope : {
      value : '@'
    },
    link : function (scope, elem, attr) {

    }
  }
});

viewModule.directive('coin', function () {
  return {
    restrict : 'a',
    templateUrl : 'components/coin.html',
    scope : {},
    transclude : true,
    link : function (scope, elem, attr) {
      $(element).click(function () {
        scope.activeLine = attr.line;
        scope.spin();
      });
    }
  }
});

function playAudio (name) {
  document.getElementById(name).play();
}