function languageSwitcher() {
    return {
        restrict: 'E',
        template: '<select name="language" id="language" ng-model="ls.selectedLanguage" ng-options="language.name for language in ls.languages" ng-change="ls.changeLanguage()"></select>',
        controllerAs: 'ls',
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

function giftGiver() {
    return {
        restrict: 'E',
        template:
            '<div>' +
            '<p translate="gifthowmany"></p>' +
            '<select name="howMany" id="howMany" ng-model="gg.howMany" ng-options="howManyOption.name for howManyOption in gg.howManyOptions"></select>' +
            '<p translate="giftline" translate-values="{count: gg.howMany.name}"></p>' +
            '</div>',
        controllerAs: 'gg',
        controller: function() {
            this.howManyOptions = [
                {name: 1},
                {name: 2},
                {name: 3},
                {name: 4},
                {name: 5}
            ];

            this.howMany = this.howManyOptions[0];
        }
    }
}

function configurator($translateProvider) {
    $translateProvider.translations('en', {
      'headline': 'Happy Holidays!',
      'gifthowmany': 'How many gifts?',
      'giftline': 'Giving {{count}} gifts'
    });

    $translateProvider.translations('es', {
      'headline': '¡Felices vacaciones!',
      'gifthowmany': '¿Cuántos dones?',
      'giftline': 'Dar {{count}} regalos!'
    });

    $translateProvider.useSanitizeValueStrategy('sanitize');
    $translateProvider.preferredLanguage('en');

}

angular.module('holiday-party', ['pascalprecht.translate', 'ngSanitize'])
    .config(configurator)
    .directive('languageSwitcher', languageSwitcher)
    .directive('giftGiver', giftGiver);
