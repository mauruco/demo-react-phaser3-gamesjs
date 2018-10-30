class Matrix {
    
    /*
        Feedforward Algorithm
        ---------------------
        Hidden[i] = Weights[i][j] * Iinputs[i]

        input layer                 hidden layer                                   OUTPUT LAYER

        input1 < i1                                     GERA WEIGHTS                                                                 GERA WEIGHTS
                        > i1 & i2 & i3 & B1 > Hidden1 [ weight1Input1 & w1i2 & w1i3 & wb] ACTIVATE1( W * I + B) <
        input2 < i2                                                                                                     A1 & A2 & HB1  > OUTPUT [ws1 & ws2 & HB1] ACTIVATEOUTPUT ( W * A + B ) > RESULT
                        > i1 & i2 & i3 & B1 > Hidden2 [ weight2Input1 & w2i2 & w2i3 & wb] ACTIVATE2( W * I + B) <
        input3 < i3
                                                                                          HiddenBias <
        InputBIAS1 <

        Weights * Inputs = SUM
        --              --   --  --   --                                 --
        | wi11 wi21 wi31 |   | i1 |   | w1i1 * i1 + w1i2 * i2 + w1i3 * i3 |
        ------------------ X ------ = -------------------------------------
        | wi12 wi22 wi32 |   | i2 |   | w2i1 * i1 + w2i2 * i2 + w2i3 * i3 |
        --              --   ------   --                                 --
                             | i3 |      
                             --  --

        
        h[i] = sigmoid( w[i][j] * i[i] + BIAS[i] ) 
        
        output tbm tem seu weights e própios BIAS paras os hidden e tbm passa pela função de ativação

        O    = sigmoid( w[i] * h[i] + BIAS[i] )

        E isso é o rasultado


        ps:
        SIGMOID é a função de ativação, muito comum
        sigmoid = f(x) = 1/(1 + e^-x)
        e (constant) = eulersnumber, naturallogarithmo number = 2.71827
    */

    constructor(rows, cols) {

        this.rows = rows;
        this.cols = cols;
        this.data = this.create(this.rows, this.cols);
    }

    create(rows, cols) {

        let m = [];
        for(let i = 0; i < rows; i++){

            m[i] = [];
            for(let j = 0; j < cols; j++)
                m[i][j] = 0.0;
        }

        return m;
    }

    loopThrough(call) {

        for(let i = 0; i < this.rows; i++)
            for(let j = 0;j < this.cols; j++)
                call(i, j);
    }

    checkMatch(m) {

        if(m.rows !== this.rows || m.cols !== this.cols)
            throw new Error('Matrix do not match!');
    }

    randomize(min = 0, max = 10) {

        this.loopThrough((i, j) => {

            this.data[i][j] = Math.floor(Math.random()*(max-(min)+1)+(min));
        });
    }

    // elementwise multiplication
    // if n is number is a scalar function
    mult(m) {
        
        this.loopThrough((i, j) => {
            
            if(m instanceof Matrix){
                
                this.checkMatch(m);
                this.data[i][j] *= m.data[i][j];
            }else{
                
                this.data[i][j] *= m;
            }
        });
    }
    
    // elementwise addition
    // if n is number is a scalar function
    add(m) {
        
        this.loopThrough((i, j) => {
            
            if(m instanceof Matrix){

                this.checkMatch(m);
                this.data[i][j] += m.data[i][j];
            }else{

                this.data[i][j] += m;
            }
        });
    }

    // Map each element in Matrix
    map(apply) {

        this.loopThrough((i, j) => {

            this.data[i][j] = apply(this.data[i][j], i, j);
        });
    }

    print() {

        if(process.env.NODE_ENV !== 'development')
            return;
        console.log(`ROWS: ${this.rows}, COLS: ${this.cols}`);
        console.table(this.data);
    }

    // Transpose
    /*
             a | b | c
        M1 = ---------
             d | e | f

        Transposed
             a | d
             -----
        M1 = b | e
             -----
             c | f
    */

    static transpose(a) {

        let b = new Matrix(a.cols, a.rows);

        a.loopThrough((i, j) => {

            b.data[j][i] = a.data[i][j];
        });

        return b;
    }

    // Matrix Product
    // Multiplixcation with other Matrix
    // Attention M1 * M2 !== M2 * M1 (Remember VECTOR DOT PRODUCT)
    // To do Matrix Product M1.COLS ne to be == M2.ROWS
    /*
             a | b | c
        M1 = ---------
             d | e | f


             g | h
             -----
        M2 = i | j
             -----
             k | l

        M1 * M2 =

        a * g + b * i + c * k | a * h + b * j + c * l
        ---------------------------------------------
        d * g + e * i + f * k | d * h + e * j + f * l 


             i0j0 | i0j1 | i0j2
        M1 = ------------------
             i1j0 | i1j1 | i1j2


             i0j0 | i0j1
             -----------
        M2 = i1j0 | i1j1
             -----------
             i2j0 | i2j1

             
        M1 * M2 =
             
        m1(i0j0) * m2(i0j0) + m1(i0j1) * m2(i1j0) + m1(i0j2) * m2(i2j0) | m1(i0j0) * m2(i0j1) + m1(i0j1) * m2(i1j1) + m1(i0j2) * m2(i2j1)
        ---------------------------------------------------------------------------------------------------------------------------------
        m1(i1j0) * m2(i0j0) + m1(i1j1) * m2(i1j0) + m1(i1j2) * m2(i2j0) | m1(i1j0) * m2(i0j1) + m1(i1j1) * m2(i1j1) + m1(i1j2) * m2(i2j1)

    */
    static multiply(a, b) {

        if(a.rows !== b.cols)
            throw new Error('A Matrix rows do not match B Matrix cols!');

        let c = new Matrix(a.rows, b.cols);

        for(let i = 0 ; i < c.rows; i++) {
            
            for(let j = 0; j < c.cols; j++) {
                
                let sum = 0;
                for(let k = 0; k < a.cols; k++){

                    sum += a.data[i][k] * b.data[k][j];
                }
                
                c.data[i][j] = sum;
            }
        }

        return c;
    }
}

export default Matrix;