
        var inp = document.getElementById("input");
        var oup = document.getElementById("output");
        var sel = document.querySelectorAll(".select");

        fetch('https://api.frankfurter.app/currencies')
            .then(res => res.json())
            .then(res => option(res));

        function option(res) {
            var name = Object.entries(res);
            for (let i = 0; i < name.length; i++) {
                let opt = `<option value="${name[i][0]}">${name[i][0]}</option>`;
                sel[0].innerHTML += opt;
                sel[1].innerHTML += opt;
            }
        }

        function calc() {
            let op1 = inp.value;
            let fir = sel[0].value;
            let sec = sel[1].value;

            if (fir === sec) {
                inp.classList.add("block");
                oup.classList.add("block");
                document.getElementById("aleart").innerHTML="* do not use same currencies";
            } else {
                calculation(fir, sec, op1);
            }
        }

        function calculation(fir, sec, op1) {
            const host = 'api.frankfurter.app';
            fetch(`https://${host}/latest?from=${fir}&to=${sec}`)
                .then(resp => resp.json())
                .then((data) => {
                    document.getElementById("output").value = (op1 * data.rates[sec]).toFixed(2);
                });
        }
        function clr(){
            inp.value="";
            oup.value="";
            inp.classList.remove("block");
            oup.classList.remove("block");
            document.getElementById("aleart").innerHTML="";
        }