import Matrix from '../Matrix';

class NeuralNetwork {

    constructor(inps, hidden, output) {

        this.inputs = inps;
        this.hidden = hidden;
        this.output = output;
        this.weightsI = new Matrix(this.hidden, this.inputs);
        this.weightsH = new Matrix(this.output, this.hidden);
        this.weightsI.randomize();
        this.weightsH.randomize();
        this.biasH = new Matrix(this.hidden, 1);
        this.biasO = new Matrix(this.output, 1);
        // should bias not be > 0 ?
        this.biasH.randomize(0, 1);
        this.biasO.randomize(0, 1);
    }

    sigmoid(x) {

        return 1/(1 + Math.exp(-x));
    }

    feedforward(inpsArray, toArray = true) {

        // generate hidden ouputs
        let ia = Matrix.fromArray(inpsArray);
        // this.weightsI.print();
        // ia.print();
        let hidden = Matrix.multiply(this.weightsI, ia);
        // hidden.print();
        hidden.add(this.biasH);
        // hidden.print();
        // activation function
        hidden.map(this.sigmoid);
        // hidden.print();
        
        // generate ouputs
        let output = Matrix.multiply(this.weightsH, hidden);
        output.add(this.biasO);
        // activation function
        output.map(this.sigmoid);

        return toArray ? Matrix.toArray(output) : output;
    }

    train(inputs, targets) {

        let outputs = this.feedforward(inputs, false);
        let answers = Matrix.fromArray(targets);
        let outErrors = Matrix.subtract(answers, outputs);


        // let hidennErrors

        outputs.print();
        answers.print();
        outErrors.print();
    }
}

export default NeuralNetwork;