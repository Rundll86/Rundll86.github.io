import Collaborator from '../componets/Collaborator.vue';
import ScratchBlock from '../componets/ScratchBlock.vue';
import SuggestionMeta from '../componets/SuggestionMeta.vue';
import SuggestionResult from '../componets/SuggestionResult.vue';
import SuggestionView from '../componets/SuggestionView.vue';
/**
 * @param {object} App
 * @param {import('vue').VueConstructor} App.Vue
 */
function enhanceApp(App) {
    const { Vue } = App;
    Vue.component(Collaborator.name, Collaborator);
    Vue.component(SuggestionMeta.name, SuggestionMeta);
    Vue.component(ScratchBlock.name, ScratchBlock);
    Vue.component(SuggestionResult.name, SuggestionResult);
    Vue.component(SuggestionView.name, SuggestionView);
};
export default enhanceApp;