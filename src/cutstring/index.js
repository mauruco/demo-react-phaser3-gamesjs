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
            all.push(temp);
            i += maxChar;
        }

        let str = '';

        for(let i = 0; i < all.length; i++)
            str += 'code+="' + all[i] + '";';
            
        var blob = new Blob([str], { type: 'text/plain;charset=utf-8;' });

        let link = document.createElement("a");
        if (link.download !== undefined) {
            var url = URL.createObjectURL(blob);
            link.setAttribute("href", url);
            link.setAttribute("download", 'code');
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    }
}

export default CutString;