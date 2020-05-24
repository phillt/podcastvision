<template functional>
    <div class="card">
        <img v-if="props.img" :src="props.img"
             class="card-img-top"
             :alt="props.title || 'something else'">
        <div class="card-body">
            <h5 v-if="props.title" class="card-title">{{props.title}}</h5>
            <p v-if="props.description" class="card-text">
                {{props.description}}
            </p>
            <template v-if="props.links">
                <a v-for="(link, index) in props.links"
                   :href="link.href"
                   target="_blank"
                   :key="index"
                   class="btn btn-primary btn-block">
                    {{link.name || link.href}}
                </a>
            </template>
        </div>
    </div>
</template>
