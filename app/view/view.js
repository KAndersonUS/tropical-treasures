'use strict';

var viewModule = angular.module('tropicalTreasures.view', [
    'tropicalTreasures.game'
])
    .controller('viewController', function($scope, createReel, advanceReel, getLine, scoreLine) {
        $scope.showPays = false;
        $scope.reels = [];
        $scope.lastScore = 0;
        $scope.lastScoreType = "";
        $scope.activeLine = "";
        $scope.spinning = false;

        generateReels();

      $scope.spin = function (line) {
        if ($scope.spinning) {
          return;
        }
        generateReels();
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
      };
      function generateReels(){
        var reel1Freq = [1, 2, 2, 2, 3, 4, 5, 6, 7, 10, 16, 6],
            reel2Freq = [1, 1, 1, 2, 2, 3, 3, 8, 9, 14, 16, 4],
            reel3Freq = [1, 1, 2, 2, 3, 3, 4, 7, 8, 14, 16, 3];
        var newReels = [];
        newReels.push(createReel(reel1Freq));
        newReels.push(createReel(reel2Freq));
        newReels.push(createReel(reel3Freq));
        $scope.reels = newReels;
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