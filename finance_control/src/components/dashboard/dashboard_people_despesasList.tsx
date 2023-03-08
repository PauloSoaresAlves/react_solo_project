import react from 'react';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import Pessoa from '../../model/pessoa';

export default function DashboardPeopleDespesasList({ pessoa }: { pessoa: Pessoa }) {

    const columns: GridColDef[] = [
        { field: 'cat', headerName: 'Categoría', flex: 1},
        { field: 'val', headerName: 'Valor', type: 'number' , flex: 1},
        { field: 'date', headerName: 'Data de Vencimento', type: 'date' , flex: 1},
        { field: 'percent', headerName: 'Valor (%)',type:'number',flex: 1, sortComparator: (a,b) =>{
            return a.percentual - b.percentual;
        } , renderCell: (params) => {
            return (
                    <div style={{width: `${params.value.percentual}%`, height: '60%', borderRadius: '5px', display:'flex',alignItems:'center' ,backgroundColor: params.value.color}}>
                         <p style={{'width' : '100%', 'textAlign':'right',
                         'textShadow': `1px 0 #000, -1px 0 #000, 0 1px #000, 0 -1px #000, 1px 1px #000, -1px -1px #000, 1px -1px #000, -1px 1px #000`,
                         'paddingRight':'3px'}}>{params.value.percentual}</p>
                    </div>
            )
        }}
    ]
    let percents: number[] = [];
    
    function calcPercents() {
        let total = 0;
        pessoa.despesas.forEach((despesa) => {
            total += parseInt(despesa.valor);
        });
        pessoa.despesas.forEach((despesa) => {
            percents.push((despesa.valor / total)*100);
        });
    }

    function randomInteger(max: number) {
        return Math.floor(Math.random()*(max + 1));
    }
    

    function randomRgbColor() {
        let r = randomInteger(255);
        let g = randomInteger(255);
        let b = randomInteger(255);
        return [r,g,b];
    }

    function randomHexColor() {
        let [r,g,b] =randomRgbColor();
        let hr = r.toString(16).padStart(2, '0');
        let hg = g.toString(16).padStart(2, '0');
        let hb = b.toString(16).padStart(2, '0');
        return "#" + hr + hg + hb;
    }

    calcPercents();

    const rows = pessoa.despesas.map((despesa, index) => {
        let DateVenc = new Date(despesa.data_inicial_transacao);

        if (new Date().getDate() > DateVenc.getDate()) {
            DateVenc = new Date(`${new Date().getFullYear()}-${new Date().getMonth() + 2}-${DateVenc.getDate()}`)
        } else {
            DateVenc = new Date(`${new Date().getFullYear()}-${new Date().getMonth() + 1}-${DateVenc.getDate()}`)
        }
        return {
            id: index,
            cat: despesa.categoria,
            val: despesa.valor,
            date: DateVenc,
            percent: {percentual:`${percents[index].toPrecision(3)}`,color:randomHexColor()}
        }
    });

    console.log(rows);

    return (
        <div className="despesasListing">
            <DataGrid
                rows={rows}
                columns={columns}
                pageSizeOptions={[5, 10, 20, 100]}
                

            />
        </div>
    )
}