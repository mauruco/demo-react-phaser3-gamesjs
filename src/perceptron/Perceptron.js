import { random } from '../helpers';
class Perceptron {

    // um perctron recebe dois inputs (será que funciona com 3? tipo terceira dimensão)
    // um perctron da um peso para cada input
    // um perctron faz um guess dos inputs, multicando os pesos pelos inputs  e somando (peso.1 * input.1 + peso2 * input2 + ....)
    // a função "ativação" converte a resposta para -1 e 1
    // um perctron treina seus pesos caso sua resposta "guess" foi diferente da resposta certa, até acertar

    // usei aqui x para input.1 e y para input.2
    weights = []; // weight for x,  weight for y // weight.input1, weight.input2
    learningRate = 0.1; // uma porcentagem de aprendizado, para diminuir a magnetude da diferença do erro pro input 

    constructor(amountWeights = 2) {

        // inizializando weights
        for(let i = 0; i < amountWeights; i++)
            this.weights[i] = Math.random() * 2 -1;
    }

    // supervise algorith
    // o novopeso = o peso + (delta) || delta é um ajuste calculado do erro para resposta certa ( delta = error * input )
    // logo esse delta pode ter uma maginetude muito grande, vamos dimuir ela multiplicando com a varavél learningrate 
    // logo novo peso = peso + (error * input * leraningrate)

    train(error, inputs) {

        let weights = this.weights;

        for(let i = 0; i < weights.length; i++){

            weights[i] += (error * inputs[i]) * this.learningRate;
        }

        this.weights = weights;
    }

    // activation function (feed forward)
    sign(sum) {
        
        // >= lidar com o valo zero
        return sum >= 0 ? 1 : -1;
    }

    // inputs / point = x, y
    guess(inputs) {

        // sum += Input0 * Weight0 + Input1 * Weight1 + .....
        let sum = 0;

        for(let i = 0; i < this.weights.length; i++) {

            sum += inputs[i] * this.weights[i];
        }

        let output = this.sign(sum);

        return output;
    }

    guessAndTrain(inputs, correctAnswer) {

        let output = this.guess(inputs);

        if(output !== correctAnswer){
                
            // i guess wrong
            let error = correctAnswer - output; // erro pode ser -2 ou 2. !!ANTENÇÃO: (output - correctAnswer) !=== (correctAnswer - output)

            for(let i = 0; i < this.weights.length; i++){

                this.weights[i] += (error * inputs[i]) * this.learningRate;
                this.weights[i] += (error * inputs[i]) * this.learningRate;
            }
        }

        return output;
    }
}

export default Perceptron;