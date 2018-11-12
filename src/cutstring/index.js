class CutString {

    constructor(){
        /*
<script>let code = '';</script>
<script src="static/js/code1.js"></script>
<script src="static/js/code2.js"></script>
<script src="static/js/code3.js"></script>
<script>eval(atob(code));</script>
        */
        
        this.area = document.createElement('textarea');
        this.button = document.createElement('button');
        this.button.innerHTML = 'CUT';
        document.body.appendChild(this.area);
        document.body.appendChild(this.button);

        this.button.addEventListener('click', (e) => {

            this.cut();
        });
    }

    cut() {
        
        let txt = btoa(this.area.value);
        let all = [];
        let i = 0;
        let maxChar = 480000;

        while(true){
            
            let temp = txt.slice(i, i+maxChar);
            if(!temp)
                break;

            all.push(new Blob(['code+="'+temp+'";'], { type: 'application/javascript;charset=utf-8;' }));
            i += maxChar;
        }

        let index = 1;

        for(let i = 0; i < all.length; i++){

            let link = document.createElement("a");
            if (link.download !== undefined) {
                let url = URL.createObjectURL(all[i]);
                link.setAttribute("href", url);
                link.setAttribute("download", 'code'+index);
                link.style.visibility = 'hidden';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }

            index++;
        }
    }
}

export default CutString;