function languageSwitcher() {
    return {
        restrict: 'E',
        template: '<select name="language" id="language" ng-model="ctrl.selectedLanguage" ng-options="language.name for language in ctrl.languages" ng-change="ctrl.changeLanguage()"></select>',
        controllerAs: 'ctrl',
        controller: function($log, $translate) {
            $log.info('Revving up language swticher.');
            this.languages = [
                {name: 'English', locale: 'en'},
                {name: 'Spanish', locale: 'es'},
            ];

            this.selectedLanguage = this.languages[0];

            this.changeLanguage = function() {
                $log.info('Switching over to ', this.selectedLanguage.locale);
                $translate.use(this.selectedLanguage.locale);
            };
        }
    };
}

function configurator($translateProvider) {
    $translateProvider.translations('en', {
      'headline': 'Happy Holidays!'
    });

    $translateProvider.translations('es', {
      'headline': '¡Felices vacaciones!'
    });

    $translateProvider.useSanitizeValueStrategy('sanitize');
    $translateProvider.preferredLanguage('en');

}

angular.module('holiday-party', ['pascalprecht.translate', 'ngSanitize'])
    .config(configurator)
    .directive('languageSwitcher', languageSwitcher);
