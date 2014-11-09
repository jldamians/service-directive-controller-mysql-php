var myApp = angular.module('myApp',['myApp.service', 'myApp.directive']);

myApp.controller('CtrlUbigeo', function($scope, serviceUbigeo) {
    $scope.departamentos = [] ;
    $scope.provincias = [] ;
    $scope.distritos = [] ;

    $scope.isLoadingDepartamento = false ;
    $scope.isLoadingProvincia    = false ;
    $scope.isLoadingDistrito     = false ;

    departamento() ;

    function departamento(){
        $scope.isLoadingDepartamento = true ;

	    serviceUbigeo.get_departamento().
	    success(function(data, status){
	    	$scope.departamentos = data ;
            $scope.isLoadingDepartamento = false ;
	    });
    };

    $scope.provincia = function () {
        if ($scope.depa !== null) {
            $scope.isLoadingProvincia = true ;

    	    serviceUbigeo.get_provincia($scope.depa.codubigeo).
    	    success(function(data, status){
                $scope.provincias = data ;
                $scope.distritos = [] ;

                console.log($scope.depa) ;

                $scope.isLoadingProvincia = false ;
    	    });
        }
        else{
            $scope.provincias = [] ;
        }
    };

    $scope.distrito = function(){
        if ($scope.prov !== null) {
            $scope.isLoadingDistrito = true ;

            serviceUbigeo.get_distrito($scope.prov.codubigeo).
            success(function(data, status){
                $scope.distritos = data ;

                console.log($scope.prov) ;

                $scope.isLoadingDistrito = false ;
            });
        }
        else{
            $scope.distritos = [] ;
        }
    };
});
