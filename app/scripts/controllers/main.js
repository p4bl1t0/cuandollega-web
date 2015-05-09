'use strict';

/**
 * @ngdoc function
 * @name cuandollegaWebApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the cuandollegaWebApp
 */
angular.module('cuandollegaWebApp')
    .controller('MainCtrl', ['$http', '$scope', '$timeout', function ($http, $scope, $timeout) {
        //localStorage.clear();
        $scope.bondis = [];
        $scope.calles = []; 
        $scope.paradas = [];
        $scope.intersecciones = [];
        $scope.colectivos = [];
        $scope.selectedStreet = null;
        $scope.selectedIntersection = null;
        $scope.selectedBus = null;
        $scope.arrivedInformation = "";
        //Data initialization
        
        var getIntersecciones = function ($http, intersecciones, calles) {
            var storageIntersecciones = localStorage.getItem("intersecciones");
            if(storageIntersecciones === null) {
                $http.get("http://sam.162.243.6.106.xip.io/data.php?action=paradas").success(function (data) {
                    angular.forEach(data, function(parada) {
                        angular.forEach($scope.calles, function(calle) {
                            if(calle.id.toString() === parada.idCalle.toString()) {
                                parada.name = calle.name;
                            }
                            if(calle.id.toString() === parada.idInter.toString()) {
                                parada.iName = calle.name;
                            }
                        });
                    });
                    console.log(data);
                    $scope.intersecciones = data;
                    localStorage.setItem("intersecciones", JSON.stringify($scope.intersecciones));
                });
            } else {
                $scope.intersecciones = JSON.parse(storageIntersecciones);
            }
        }
        
        var storageBondis = localStorage.getItem("bondis");
        if(storageBondis === null) {
            $http.get("http://sam.162.243.6.106.xip.io/data.php?action=bondis").success(function (data) {
                console.log(data);
                $scope.bondis = data;
                localStorage.setItem('bondis', JSON.stringify($scope.bondis));
                getIntersecciones($http, $scope.intersecciones, $scope.calles);
            });
        } else {
            $scope.bondis = JSON.parse(storageBondis);
            getIntersecciones($http, $scope.intersecciones, $scope.calles);
        }
        var storageCalles = localStorage.getItem("calles");
        if(storageCalles === null) {
            $http.get("http://sam.162.243.6.106.xip.io/data.php?action=calles").success(function (data) {
                console.log(data);
                $scope.calles = data;
                localStorage.setItem('calles', JSON.stringify($scope.calles));
                
            });
        } else {
            $scope.calles =JSON.parse(storageCalles);
            
        }
        
        //Bindings
        
        $scope.streetChange = function () {
            console.log($scope.selectedStreet);
            $scope.paradas = [];
            angular.forEach($scope.intersecciones, function(parada) {
                //console.log(parada.id, $scope.selectedStreet.id, parada.id === $scope.selectedStreet.id);
                if(parada.idCalle.toString() === $scope.selectedStreet.id.toString()) {
                    $scope.paradas.push(parada);
                }
            });
            console.log($scope.paradas);
        };
        $scope.intersectionChange = function () {
            console.log($scope.selectedIntersection);
            $scope.colectivos = [];
            angular.forEach($scope.bondis, function(bondi) {
                angular.forEach($scope.selectedIntersection.bondis, function(colectivo) {
                    //console.log(parada.id, $scope.selectedStreet.id, parada.id === $scope.selectedStreet.id);
                    if(bondi.id.toString() === colectivo.id.toString()) {
                        
                        $scope.colectivos.push(bondi);
                    }
                });
            });
            console.log($scope.colectivos );
        };
        $scope.showArrivedInformation = function  () {
            console.log("Parada:", $scope.selectedIntersection.parada);
            console.log("Linea:", $scope.selectedBus.linea);
            $http.get("http://sam.162.243.6.106.xip.io/data.php?action=llegada&parada=" + $scope.selectedIntersection.parada + "&linea=" + $scope.selectedBus.linea).success(function (data) {
                $scope.arrivedInformation = data;
            });
        }

    }]);
