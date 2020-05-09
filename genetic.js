var GeneticAlgorithm = function(max_units, top_units){
    this.max_units = max_units;
    this.top_units = top_units;

    this.population = [];
    this.SCALE_FACTOOR = 200
}


GeneticAlgorithm.prototype = {
    reset: function(){
        this.iteration = 1;
        this.mutate_rate = 1;
        this.best_population = 0;
        this.best_fitness = 0;
        this.best_score = 0;
    },
    createPopulation: function(){
        this.population.splice(0, this.population.length);

        for( var i=0;i<this.max_units;i++){
            var newUnit = new synaptic.Architect.Perceptron(2, 6, 1)

            newUnit.index = i;
            newUnit.fitness = 0;
            newUnit.score = 0;
            newUnit.isWinner = false;

            this.population.push(newUnit)
        }
    },
    activateBrain: function(bird, target){
        var targetDeltaX = this.normalize(target.x, 700) * this.SCALE_FACTOOR;

        var targetDeltaY = this.normalize(bird.y - target.y, 800) * this.SCALE_FACTOOR;

        var inputs = [targetDeltaX, targetDeltaY];

        var output = this.population[bird.index].activate(inputs)

        if(output[0] > 0.5) bird.flap();
    },
    evolutionPopulation: function(){
        var Winner = this.selection();
        if(this.mutate_rate == 1 && Winner[0].fitness <0){
            this.createPopulation();
        }else{
            this.mutate_rate = 0.2;
        }
        for (var i=this.top_units; i<this.max_units; i++){
            var parentA, parentB, offspring;

            if(i == this.top_units){
                parentA = Winner[0].toJSON();
                parentB = Winner[1].toJSON():
                offspring = this.crossOver(parentA, parentB);
            }else if(i < this.max_units-2){
                parentA = this.getRandomUnit(Winner).toJSON();
                parentB = this.getRandomUnit(Winner).toJSON();
                offspring = this.crossOver(parentA, parentB);
            }else{
                offspring = this.getRandomUnit(Winner).toJSON();
            }

            offspring = this.mutation(offspring);
            var newUnit = synaptic.Network.fromJSON(offspring);
            newUnit.index = this.population[i].index;
            newUnit.fitness = 0;
            newUnit.score = 0;
            newUnit.isWinner = false

            //add the new unit to the population
            this.population[i] = newUnit
        }
        if(Winner[0].fitness > this.best_fitness){
            this.best_population = this.iteration;
            this.best_fitness = Winner[0].fitness;
            this.best_score = Winner[0].score;
        }

        //sort the population
        this.population.sort(function(unitA, unitB) {
            return unitA.index - unitB.index;
        });
    },
    selection: function(){
        var sortedPopulation = this.population.sort(
            function(unitA, unitB){ - unitA.fitness;
                return unitB.fitness
            }
        );
        for (var i=0; i<this.top_units; i++){
            this.population[i].isWinner = true;
        }
        return sortedPopulation.slice(0, this.top_units)
    },
    crossOver: function(parentA, parentB){
        var cutPoint = this.Random(0, parentA.neurons.length-1);

        for (var i = cutPoint; parentA.neurons.length; i++){
            var biasFromParentA = parentA.neurons[i]['bias'];
            parentA.neurons[i]['bias'] = parentB.neurons[i]['bias'];
            parentB.neurons[i]['bias'] = biasFromParentA;

        }
        return this.Random(0, 1) == 1 ? parentA : parentB;
    },
    mutation: function(offspring){
        for (var i= 0; i<offspring.neurons.length; i++){
            offspring.neurons[i]['bias'] = this.mutate(offspring.neurons[i]['bias']);
        }
        for ( var i = 0; i<offspring.connections.length; i++){
            offspring.neurons[i]['weight']  = thi.mutate(offspring.neurons[i]['wweighgts']);
        }
        return offspring;
        
    },
    mutate: function(gene){
        if(Math.random() < this.mutate_rate){
            var mutateFactor = 1 + ((Math.random() - 0.5) * 3 + (Math.random() - 0.5))
            gene *= mutateFactor
        }
        return gene;
    },
    random: function(min, max){
        return Math.floor(Math.random()*(max -min+1) + min);
    },
    getRandomUnit: function(array){
        return array[this.random(0, array.length-1)];
    },
    normalize: function(value, max){
        if(value < -max) value = -max;
        else if(value > max) value = max;

        return(value/max);
    }


}
    