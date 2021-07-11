var app = new Vue({
    el: '#app',
    created: function(){
        console.log('Hook created successfully!');
        this.get_content();
    },
    data: {
        author: {},
        services: [],
        projects: [],
        skills: [],
    },
    methods: {
        get_content: function(){
            axios.get('resources/js/page.json')
            .then(response => {
                this.author = response.data.author;
                this.services = response.data.services;
                this.projects = response.data.projects;
                this.skills = response.data.skills;

            })
            .catch(error => {
                console.log('Error: ', error);
            });
        }
    }
});