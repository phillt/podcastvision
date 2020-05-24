<template functional>
    <div class="card" style="width: 18rem;">
        <img :src="props.img"
             class="card-img-top"
             :alt="props.name">
        <div class="card-body">
            <h5 class="card-title">{{props.name}}</h5>
            <p class="card-text">
                {{props.description}}
            </p>
            <a :href="props.link"
               class="btn btn-primary btn-block">
                <i class="fab fa-twitter"></i> {{props.handle}}
            </a>
        </div>
    </div>
</template>
