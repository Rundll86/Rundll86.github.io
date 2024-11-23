import Collaborator from '../componets/Collaborator.vue';
export default ({
    Vue,
    options,
    router,
    siteData,
    isServer
}) => {
    Vue.component(Collaborator.name, Collaborator)
}