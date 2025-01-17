import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  // brandsSuccess,
  fetchFail,
  fetchStart,
  // firmsSuccess,
  getSuccess,
} from "../features/stockSlice";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const useStockCall = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);

  // const getFirms = async () => {
  //   dispatch(fetchStart());
  //   try {
  //     const { data } = await axios(`${BASE_URL}firms`, {
  //       headers: {
  //         Authorization: `Token ${token}`,
  //         // Authorization: `Bearer ${accesstoken}` //* jwt için
  //       },
  //     });
  //     console.log(data);
  //     // dispatch(firmsSuccess(data.data));
  //     dispatch(getSuccess({data:data.data,url:"firms"}));
  //   } catch (error) {
  //     console.log(error);
  //     dispatch(fetchFail());
  //   }
  // };
  // const getBrands = async () => {
  //   dispatch(fetchStart());
  //   try {
  //     const { data } = await axios(`${BASE_URL}brands`, {
  //       headers: {
  //         Authorization: `Token ${token}`,
  //         // Authorization: `Bearer ${accesstoken}` //* jwt için
  //       },
  //     });
  //     console.log(data);
  //     // dispatch(brandsSuccess(data.data));
  //     dispatch(getSuccess({data:data.data,url:"brands"}));//* action creatorlar her zaman tek bir parametre kabul ederler
  //   } catch (error) {
  //     console.log(error);
  //     dispatch(fetchFail());
  //   }
  // };

  //* DRY
  //! yukarıdaki gibi her seferinde yazmak yerine daha modüler bir yapı kurarak tek bir fonksiyonla bir den fazla get işlemini gerçekleştirebiliyoruz
  const getStockData = async (url) => {
    dispatch(fetchStart());
    try {
      const { data } = await axios(`${BASE_URL}${url}`, {
        headers: {
          Authorization: `Token ${token}`,
          // Authorization: `Bearer ${accesstoken}` //* jwt için
        },
      });
      console.log(data);
      // dispatch(brandsSuccess(data.data));
      // dispatch(getSuccess({data:data.data,url:url}));//* action creatorlar her zaman tek bir parametre kabul ederler
      dispatch(getSuccess({ data: data.data, url })); //* action creatorlar her zaman tek bir parametre kabul ederler
    } catch (error) {
      console.log(error);
      dispatch(fetchFail());
    }
  };
  const deleteStockData = async (url, id) => {
    dispatch(fetchStart());
    try {
      await axios.delete(`${BASE_URL}${url}/${id}`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      getStockData(url); //silme islemi gerceklestikten sonra verinin UI dan da silinmesi icin veriyi engüncel haliyle cekmemiz gerekiyor. Bunu da en pratik getStockData fonksiyounu cagirarak yapabiliriz.
    } catch (error) {
      console.log(error);
      dispatch(fetchFail());
    } finally {
      getStockData(url); //islem basarisiz da olsa verinin güncellenmesi ve Ui dan silinmesi icin sonda tekrar getStockData fonksiyonunu cagirdik
    }
  };

  return {
    // getFirms,
    // getBrands,
    getStockData,
    deleteStockData,
  };
};

export default useStockCall;
