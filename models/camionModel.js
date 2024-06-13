const {pool} = require('../db'); // 1ero llamar la base de datos, pool-> llamar consultas

const getAllCamions = async () => { // creando funcion asincrona
    try {
        const [rows] = await pool.query('SELECT CAMION.NRO, TIPOCAMION.NOMBRE FROM CAMION, TIPOCAMION WHERE ID = IDTIPOCAMION') ;   //LENA DATOS DEDE TIPO CAMION BD
        return rows;      // retorna 
        } catch (error){
           
          throw new Error(error.message);   
    
        }
    
};

const createCamion = async(Camion) =>{ // creando un nuevo tipo camion
    const {nro, idtipocamion} = Camion;
    try {
        await pool.query('INSERT INTO CAMION(NRO, IDTIPOCAMION) VALUES(?,?)', [nro,idtipocamion]); 
    }catch (error){
       
    throw new Error(error.message);   

  }
};

const updateCamion = async(nro, Camion) =>{ //(que elementos a encontrar, lo que se va a cambiar )
    const {idtipocamion} = Camion;
    try {
        await pool.query('UPDATE CAMION SET IDTIPOCAMION = ? WHERE NRO = ?', [idtipocamion, nro]);
    }catch (error){
       
        throw new Error(error.message);
    }
};

const deleteCamion = async(nro) =>{
    try{
        await pool.query('DELETE FROM CAMION WHERE NRO = ?', [nro]);
    }catch (error){
       
        throw new Error(error.message);
    }
};

module.exports = {
    createCamion,
    updateCamion,
    deleteCamion,
    getAllCamions
};
