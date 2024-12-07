import Collaborator from '../componets/Collaborator.vue';
import ScratchBlock from '../componets/ScratchBlock.vue';
import SuggestionMeta from '../componets/SuggestionMeta.vue';
import SuggestionResult from '../componets/SuggestionResult.vue';
export default ({
    Vue,
    options,
    router,
    siteData,
    isServer
}) => {
    Vue.component(Collaborator.name, Collaborator);
    Vue.component(SuggestionMeta.name, SuggestionMeta);
    Vue.component(ScratchBlock.name, ScratchBlock);
    Vue.component(SuggestionResult.name, SuggestionResult);
};