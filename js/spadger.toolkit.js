/**
 * 麻雀工具包
 */

(function(window){
  var spadger = window.spadger = {};

  //算法整理
  /**
   * （一）排序算法整理
   * 1.1 插入排序
   */
  function insertSort(array){
    var len = array.length,
      i,j,tmp,
      result = array.slice(0);

    for(i=1;i<len;i++){
      tmp = result[i];
      j = i-1;

      while(j>=0&&tmp<result[j]){
        result[j+1] = result[j];
        j--;
      }
      result[j+1] = tmp;
    }

    return result;
  }

  /**
   * 1.2 二分插入排序
   */



  /**
   * 1.3 希尔排序
   */



  /**
   * 1.4 冒泡排序
   */
  function bubbleSort(array){
    var tmpMax;

    for(var i=0,len=array.length;i<len;i++){
      for(var j=0;j<len-i;j++){
        array[j]>array[j+1] && (tmpMax=array[j+1],array[j+1]=array[j],array[j]=tmpMax);
      }
    }

    return array;
  }



  /**
   * 1.5 选择排序
   */


  /**
   * 1.6 快速排序
   */


  /**
   * （十）其他公共方法
   * 去重
   */
  function delRepeatItem(array){
    var result = [];
    array.map(function(e){
      result.indexOf(e) == -1 && result.push(e);
    });
    return result;
  }

})(window);