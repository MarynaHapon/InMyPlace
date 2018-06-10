var placeListController = function ($scope) {
    $scope.data = [{
        name: 'Кафе Котовичі',
        address: 'Україна, м. Київ, вул. Кота Котовича, буд 9',
        rating: 4,
        facilities: [],
        distance: '0.2872312312',
        _id: '5b155238d6060109302e8ceb'
    },
    {
        name: 'Кафе Котовичі 2',
        address: 'Україна, м. Київ, вул. Кота Котовича, буд 10',
        rating: 4,
        facilities: [],
        distance: '0.2872312312',
        _id: '5b1ab9bac2b9761a68475aeb'
    }
    ]
};

angular
    .module('ngInMyPlace')
    .controller('inMyPlaceController', placeListController);
