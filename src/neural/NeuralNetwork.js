import Matrix from '../Matrix';

class NeuralNetwork {

    constructor(inputs, hiddens, outputs, learningRate = 0.1) {

        this.inputs = inputs;
        this.hiddens = hiddens;
        this.outputs = outputs;
        this.weightsHiddensGiveToInputs = new Matrix(this.hiddens, this.inputs);
        this.weightsOutputsGiveToHiddens = new Matrix(this.outputs, this.hiddens);
        this.weightsHiddensGiveToInputs.randomize();
        this.weightsOutputsGiveToHiddens.randomize();
        this.biasH = new Matrix(this.hiddens, 1);
        this.biasO = new Matrix(this.outputs, 1);
        // should bias not be > 0 ?
        this.biasH.randomize(0, 1);
        this.biasO.randomize(0, 1);
        this.learningRate = learningRate;
    }

    sigmoid(x) {

        return 1/(1 + Math.exp(-x));
    }

    diveredSigmoid(x) {

        // real sigmoid
        // return this.sigmoid(x) * (1 - this.sigmoid(x));
        // if x is already sigmoid
        return x * (1 - x);
    }

    feedforward(inputsArray, toArray = true) {

        // generate hiddens ouputs
        let inputs = Matrix.fromArray(inputsArray);
        // this.weightsI.print();
        // inputs.print();
        let hiddens = Matrix.multiply(this.weightsHiddensGiveToInputs, inputs);
        // hiddens.print();
        hiddens.add(this.biasH);
        // hiddens.print();
        // activation function
        hiddens.map(this.sigmoid);
        // hiddens.print();
        
        // generate ouputs
        let outputs = Matrix.multiply(this.weightsOutputsGiveToHiddens, hiddens);
        outputs.add(this.biasO);
        // activation function
        outputs.map(this.sigmoid);

        return toArray ? Matrix.toArray(outputs) : outputs;
    }

    train(inputsArray, targetsArray) {

        // generate hiddens ouputs
        let inputs = Matrix.fromArray(inputsArray);
        let hiddens = Matrix.multiply(this.weightsHiddensGiveToInputs, inputs);
        // ads bias
        hiddens.add(this.biasH);
        // activation function
        hiddens.map(this.sigmoid);
        
        // generate ouputs
        let outputs = Matrix.multiply(this.weightsOutputsGiveToHiddens, hiddens);
        outputs.add(this.biasO);
        // activation function
        outputs.map(this.sigmoid);

        
        // comparando guess com resposta
        let answers = Matrix.fromArray(targetsArray);
        let outErrors = Matrix.subtract(answers, outputs);
        
        // calculate gradientes de ajuste
        // deltaAllWeightsHiddenToOutput.matrix = [ lr(elementwise multiplication) * ErrorOutput(matrix)  *  {s'(x) == (O*(1-O)(elementwise multiplication O e não 0)} ] * transpose(Hidden.matrix( O ouput de hiddens ))
        let gradients = Matrix.map(outputs, this.diveredSigmoid); // Copy off outputs    // *  {s'(x) == (O*(1-O)(elementwise multiplication O e não 0)}

        gradients.multiply(outErrors);                                                   // * ErrorOutput(matrix)
        gradients.multiply(this.learningRate);                                           // * lr(elementwise multiplication)

        // BIAS OUT
        this.biasO.add(gradients);

        // calculate deltas
        let hiddensTransposed = Matrix.transpose(hiddens);
        let deltaHiddensToOutputs = Matrix.multiply(gradients, hiddensTransposed);       // * transpose(Hidden.matrix( O ouput de hiddens )

        // finalmente ajustando os weights
        this.weightsOutputsGiveToHiddens.add(deltaHiddensToOutputs);

        // calculando hiddenslaers erros
        let weightsOutputsGiveToHiddensTransposed = Matrix.transpose(this.weightsOutputsGiveToHiddens);
        let hiddensErros = Matrix.multiply(weightsOutputsGiveToHiddensTransposed, outErrors);

        // gradientes de hiddens
        // hiddens == output de hiddens
        // hiddens.print();
        let Hgradients = Matrix.map(hiddens, this.diveredSigmoid);
        Hgradients.multiply(hiddensErros);
        Hgradients.multiply(this.learningRate);
        
        // BIAS Hidden
        this.biasH.add(Hgradients);
        // this.biasH.print();

        // inputs to hidden deltas
        let inputsTranposed = Matrix.transpose(inputs);

        // Hgradients.print();
        // inputsTranposed.print();
        let deltaInputsToHiddens = Matrix.multiply(Hgradients, inputsTranposed);

        this.weightsHiddensGiveToInputs.add(deltaInputsToHiddens);

        outputs.print();
        // answers.print();
        // outErrors.print();

        // this.weightsOutputsGiveToHiddens.print();
        // this.weightsHiddensGiveToInputs.print();
    }
}

export default NeuralNetwork;