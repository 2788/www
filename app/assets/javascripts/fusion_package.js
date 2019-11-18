$(function() {
  $fusionPackageEventPage = $('.events-page-fusion_package .fusion-package-page');
  $fusionPackageApplyLinks = $('.events-page-fusion_package .fusion-package-page .fusion-package-apply');

  fusionPackageApplyURL = 'https://jinshuju.net/f/AEdz1r?x_field_1='

  if ($fusionPackageEventPage.length > 0) {
    uuid = generateUUID();
    timestamp = new Date().getTime();
    $.ajax({
      method: 'GET',
      url: '/userinfo?u=' + uuid + '&t=' + timestamp,
      success: function(res) {
        if (res.is_signin && res.uid) {
          $fusionPackageApplyLinks.attr('href', fusionPackageApplyURL + res.uid);
        }
      }
    });
  }
})

$(function() {
  $fusionPackageEventPage = $('.events-page-fusion_package .fusion-package-page');
  if ($fusionPackageEventPage.length > 0) {
    startOfDayTime = new Date(new Date().setHours(0, 0, 0, 0));
    endTime = new Date('2019-12-01');
    leftTime = (endTime.getTime() - startOfDayTime.getTime()) / (24 * 60 * 60 * 1000);
    hottime = document.getElementById('hottime');
    if (leftTime < 0) {
      leftTime = 0;
    }
    hottime.innerHTML = parseInt(leftTime);
  }
})

$(function() {
  $fusionPackageEventPage = $('.events-page-fusion_package .fusion-package-page');
  if ($fusionPackageEventPage.length > 0) {
    function Dsy() {
      this.Items = {};
    }
    Dsy.prototype.add = function(id, iArray) {
      this.Items[id] = iArray;
    };
    var dsy = new Dsy();
    var s = ["alongwith_type", "alongwith_time", "alongwith_Price"];
    dsy.add("0", ["HTTPS", "HTTP"]);
    dsy.add("0_0_0", ["￥17<br><span>省 ￥12</span><script>alongwith_type='https://portal.qiniu.com/financial/respack/fusion-composite?settlement%3Dlifetime%26type%3D%E5%9B%BD%E5%86%85HTTPS%E9%97%B2%E6%97%B6%E6%AE%B5%E9%9D%99%E6%80%81%E5%8A%A0%E9%80%9F%E6%B5%81%E9%87%8F%26capacity%3D100GB'</script>"]);
    dsy.add("0_0_1", ["￥25<br><span>省 ￥3</span><script>alongwith_type='https://portal.qiniu.com/financial/respack/fusion-composite?settlement%3Dlifetime%26type%3D%E5%9B%BD%E5%86%85HTTPS%E5%85%A8%E6%97%B6%E6%AE%B5%E9%9D%99%E6%80%81%E5%8A%A0%E9%80%9F%E6%B5%81%E9%87%8F%26capacity%3D100GB'</script>"]);
    dsy.add("0_0", ["闲时段", "全时段"]);
    dsy.add("0_1_0", ["￥14<br><span>省 ￥10</span><script>alongwith_type='https://portal.qiniu.com/financial/respack/fusion-composite?settlement%3Dlifetime%26type%3D%E5%9B%BD%E5%86%85HTTP%E9%97%B2%E6%97%B6%E6%AE%B5%E9%9D%99%E6%80%81%E5%8A%A0%E9%80%9F%E6%B5%81%E9%87%8F%26capacity%3D100GB'</script>"]);
    dsy.add("0_1_1", ["￥20<br><span>省 ￥4</span><script>alongwith_type='https://portal.qiniu.com/financial/respack/fusion-composite?settlement%3Dlifetime%26type%3D%E5%9B%BD%E5%86%85HTTP%E5%85%A8%E6%97%B6%E6%AE%B5%E9%9D%99%E6%80%81%E5%8A%A0%E9%80%9F%E6%B5%81%E9%87%8F%26capacity%3D100GB'</script>"]);
    dsy.add("0_1", ["闲时段", "全时段"]);
    $("select[name='alongwith_type'],select[name='alongwith_time']").change(function() {
      select(this.name == 'alongwith_type' ? 0 : 1);
    });
    function select(index) {
      var tv = index >= 0 ? $("select[name=" + s[index] + "]").val() : "0";
      var arr = dsy.Items[tv],
      i = 0,
      html = "";
      if (arr) {
        for (i = arr.length; i--;) {
          html += index == 1 ? arr[i] : '<option value="' + tv + '_' + i + '">' + arr[i] + '</option>';
        }
  
        $("#" + s[++index]).html(html);
        index < 2 && select(index);
      } else {
        for (i = 2; i > index; i--) {
          $("select[name=" + s[i] + "]").empty();
        }
      }
    }
    select( - 1);
  }
})

$(function() {
  $fusionPackageEventPage = $('.events-page-fusion_package .fusion-package-page');
  if ($fusionPackageEventPage.length > 0) {
    function Dsy() {
      this.Items = {};
    }
    Dsy.prototype.add = function(id, iArray) {
      this.Items[id] = iArray;
    };
    var dsy = new Dsy();
    var s = ["alongwith_type2", "alongwith_time2", "alongwith_Price2"];
    dsy.add("0", ["HTTPS", "HTTP"]);
    dsy.add("0_0_0", ["￥78<br><span>省 ￥62</span><script>alongwith_type2='https://portal.qiniu.com/financial/respack/fusion-composite?settlement%3Dlifetime%26type%3D%E5%9B%BD%E5%86%85HTTPS%E9%97%B2%E6%97%B6%E6%AE%B5%E9%9D%99%E6%80%81%E5%8A%A0%E9%80%9F%E6%B5%81%E9%87%8F%26capacity%3D500GB'</script>"]);
    dsy.add("0_0_1", ["￥122<br><span>省 ￥18</span><script>alongwith_type2='https://portal.qiniu.com/financial/respack/fusion-composite?settlement%3Dlifetime%26type%3D%E5%9B%BD%E5%86%85HTTPS%E5%85%A8%E6%97%B6%E6%AE%B5%E9%9D%99%E6%80%81%E5%8A%A0%E9%80%9F%E6%B5%81%E9%87%8F%26capacity%3D500GB'</script>"]);
    dsy.add("0_0", ["闲时段", "全时段"]);
    dsy.add("0_1_0", ["￥67<br><span>省 ￥52</span><script>alongwith_type2='https://portal.qiniu.com/financial/respack/fusion-composite?settlement%3Dlifetime%26type%3D%E5%9B%BD%E5%86%85HTTP%E9%97%B2%E6%97%B6%E6%AE%B5%E9%9D%99%E6%80%81%E5%8A%A0%E9%80%9F%E6%B5%81%E9%87%8F%26capacity%3D500GB'</script>"]);
    dsy.add("0_1_1", ["￥98<br><span>省 ￥22</span><script>alongwith_type2='https://portal.qiniu.com/financial/respack/fusion-composite?settlement%3Dlifetime%26type%3D%E5%9B%BD%E5%86%85HTTP%E5%85%A8%E6%97%B6%E6%AE%B5%E9%9D%99%E6%80%81%E5%8A%A0%E9%80%9F%E6%B5%81%E9%87%8F%26capacity%3D500GB'</script>"]);
    dsy.add("0_1", ["闲时段", "全时段"]);
    $("select[name='alongwith_type2'],select[name='alongwith_time2']").change(function() {
      select(this.name == 'alongwith_type2' ? 0 : 1);
    });
    function select(index) {
      var tv = index >= 0 ? $("select[name=" + s[index] + "]").val() : "0";
      var arr = dsy.Items[tv],
      i = 0,
      html = "";
      if (arr) {
        for (i = arr.length; i--;) {
          html += index == 1 ? arr[i] : '<option value="' + tv + '_' + i + '">' + arr[i] + '</option>';
        }
  
        $("#" + s[++index]).html(html);
        index < 2 && select(index);
      } else {
        for (i = 2; i > index; i--) {
          $("select[name=" + s[i] + "]").empty();
        }
      }
    }
    select( - 1);
  }
})

$(function() {
  $fusionPackageEventPage = $('.events-page-fusion_package .fusion-package-page');
  if ($fusionPackageEventPage.length > 0) {
    function Dsy() {
      this.Items = {};
    }
    Dsy.prototype.add = function(id, iArray) {
      this.Items[id] = iArray;
    };
    var dsy = new Dsy();
    var s = ["alongwith_type3", "alongwith_time3", "alongwith_Price3"];
    dsy.add("0", ["HTTPS", "HTTP"]);
    dsy.add("0_0_0", ["￥152<br><span>省 ￥134</span><script>alongwith_type3='https://portal.qiniu.com/financial/respack/fusion-composite?settlement%3Dlifetime%26type%3D%E5%9B%BD%E5%86%85HTTPS%E9%97%B2%E6%97%B6%E6%AE%B5%E9%9D%99%E6%80%81%E5%8A%A0%E9%80%9F%E6%B5%81%E9%87%8F%26capacity%3D1TB'</script>"]);
    dsy.add("0_0_1", ["￥241<br><span>省 ￥45</span><script>alongwith_type3='https://portal.qiniu.com/financial/respack/fusion-composite?settlement%3Dlifetime%26type%3D%E5%9B%BD%E5%86%85HTTPS%E5%85%A8%E6%97%B6%E6%AE%B5%E9%9D%99%E6%80%81%E5%8A%A0%E9%80%9F%E6%B5%81%E9%87%8F%26capacity%3D1TB'</script>"]);
    dsy.add("0_0", ["闲时段", "全时段"]);
    dsy.add("0_1_0", ["￥130<br><span>省 ￥115</span><script>alongwith_type3='https://portal.qiniu.com/financial/respack/fusion-composite?settlement%3Dlifetime%26type%3D%E5%9B%BD%E5%86%85HTTP%E9%97%B2%E6%97%B6%E6%AE%B5%E9%9D%99%E6%80%81%E5%8A%A0%E9%80%9F%E6%B5%81%E9%87%8F%26capacity%3D1TB'</script>"]);
    dsy.add("0_1_1", ["￥193<br><span>省 ￥53</span><script>alongwith_type3='https://portal.qiniu.com/financial/respack/fusion-composite?settlement%3Dlifetime%26type%3D%E5%9B%BD%E5%86%85HTTP%E5%85%A8%E6%97%B6%E6%AE%B5%E9%9D%99%E6%80%81%E5%8A%A0%E9%80%9F%E6%B5%81%E9%87%8F%26capacity%3D1TB'</script>"]);
    dsy.add("0_1", ["闲时段", "全时段"]);
    $("select[name='alongwith_type3'],select[name='alongwith_time3']").change(function() {
      select(this.name == 'alongwith_type3' ? 0 : 1);
    });
    function select(index) {
      var tv = index >= 0 ? $("select[name=" + s[index] + "]").val() : "0";
      var arr = dsy.Items[tv],
      i = 0,
      html = "";
      if (arr) {
        for (i = arr.length; i--;) {
          html += index == 1 ? arr[i] : '<option value="' + tv + '_' + i + '">' + arr[i] + '</option>';
        }
  
        $("#" + s[++index]).html(html);
        index < 2 && select(index);
      } else {
        for (i = 2; i > index; i--) {
          $("select[name=" + s[i] + "]").empty();
        }
      }
    }
    select( - 1);
  }
})

$(function() {
  $fusionPackageEventPage = $('.events-page-fusion_package .fusion-package-page');
  if ($fusionPackageEventPage.length > 0) {
    function Dsy() {
      this.Items = {};
    }
    Dsy.prototype.add = function(id, iArray) {
      this.Items[id] = iArray;
    };
    var dsy = new Dsy();
    var s = ["alongwith_type4", "alongwith_time4", "alongwith_Price4"];
    dsy.add("0", ["HTTPS", "HTTP"]);
    dsy.add("0_0_0", ["￥688<br><span>省 ￥745</span><script>alongwith_type4='https://portal.qiniu.com/financial/respack/fusion-composite?settlement%3Dlifetime%26type%3D%E5%9B%BD%E5%86%85HTTPS%E9%97%B2%E6%97%B6%E6%AE%B5%E9%9D%99%E6%80%81%E5%8A%A0%E9%80%9F%E6%B5%81%E9%87%8F%26capacity%3D5TB'</script>"]);
    dsy.add("0_0_1", ["￥1,178<br><span>省 ￥255</span><script>alongwith_type4='https://portal.qiniu.com/financial/respack/fusion-composite?settlement%3Dlifetime%26type%3D%E5%9B%BD%E5%86%85HTTPS%E5%85%A8%E6%97%B6%E6%AE%B5%E9%9D%99%E6%80%81%E5%8A%A0%E9%80%9F%E6%B5%81%E9%87%8F%26capacity%3D5TB'</script>"]);
    dsy.add("0_0", ["闲时段", "全时段"]);
    dsy.add("0_1_0", ["￥590<br><span>省 ￥638</span><script>alongwith_type4='https://portal.qiniu.com/financial/respack/fusion-composite?settlement%3Dlifetime%26type%3D%E5%9B%BD%E5%86%85HTTP%E9%97%B2%E6%97%B6%E6%AE%B5%E9%9D%99%E6%80%81%E5%8A%A0%E9%80%9F%E6%B5%81%E9%87%8F%26capacity%3D5TB'</script>"]);
    dsy.add("0_1_1", ["￥942<br><span>省 ￥286</span><script>alongwith_type4='https://portal.qiniu.com/financial/respack/fusion-composite?settlement%3Dlifetime%26type%3D%E5%9B%BD%E5%86%85HTTP%E5%85%A8%E6%97%B6%E6%AE%B5%E9%9D%99%E6%80%81%E5%8A%A0%E9%80%9F%E6%B5%81%E9%87%8F%26capacity%3D5TB'</script>"]);
    dsy.add("0_1", ["闲时段", "全时段"]);
    $("select[name='alongwith_type4'],select[name='alongwith_time4']").change(function() {
      select(this.name == 'alongwith_type4' ? 0 : 1);
    });
    function select(index) {
      var tv = index >= 0 ? $("select[name=" + s[index] + "]").val() : "0";
      var arr = dsy.Items[tv],
      i = 0,
      html = "";
      if (arr) {
        for (i = arr.length; i--;) {
          html += index == 1 ? arr[i] : '<option value="' + tv + '_' + i + '">' + arr[i] + '</option>';
        }
  
        $("#" + s[++index]).html(html);
        index < 2 && select(index);
      } else {
        for (i = 2; i > index; i--) {
          $("select[name=" + s[i] + "]").empty();
        }
      }
    }
    select( - 1);
  }
})

$(function() {
  $fusionPackageEventPage = $('.events-page-fusion_package .fusion-package-page');
  if ($fusionPackageEventPage.length > 0) {
    function Dsy() {
      this.Items = {};
    }
    Dsy.prototype.add = function(id, iArray) {
      this.Items[id] = iArray;
    };
    var dsy = new Dsy();
    var s = ["alongwith_type5", "alongwith_time5", "alongwith_Price5"];
    dsy.add("0", ["HTTPS", "HTTP"]);
    dsy.add("0_0_0", ["￥1,319<br><span>省 ￥1,548</span><script>alongwith_type5='https://portal.qiniu.com/financial/respack/fusion-composite?settlement%3Dlifetime%26type%3D%E5%9B%BD%E5%86%85HTTPS%E9%97%B2%E6%97%B6%E6%AE%B5%E9%9D%99%E6%80%81%E5%8A%A0%E9%80%9F%E6%B5%81%E9%87%8F%26capacity%3D10TB'</script>"]);
    dsy.add("0_0_1", ["￥2,304<br><span>省 ￥563</span><script>alongwith_type5='https://portal.qiniu.com/financial/respack/fusion-composite?settlement%3Dlifetime%26type%3D%E5%9B%BD%E5%86%85HTTPS%E5%85%A8%E6%97%B6%E6%AE%B5%E9%9D%99%E6%80%81%E5%8A%A0%E9%80%9F%E6%B5%81%E9%87%8F%26capacity%3D10TB'</script>"]);
    dsy.add("0_0", ["闲时段", "全时段"]);
    dsy.add("0_1_0", ["￥1,130<br><span>省 ￥1,327</span><script>alongwith_type5='https://portal.qiniu.com/financial/respack/fusion-composite?settlement%3Dlifetime%26type%3D%E5%9B%BD%E5%86%85HTTP%E9%97%B2%E6%97%B6%E6%AE%B5%E9%9D%99%E6%80%81%E5%8A%A0%E9%80%9F%E6%B5%81%E9%87%8F%26capacity%3D10TB'</script>"]);
    dsy.add("0_1_1", ["￥1,843<br><span>省 ￥614</span><script>alongwith_type5='https://portal.qiniu.com/financial/respack/fusion-composite?settlement%3Dlifetime%26type%3D%E5%9B%BD%E5%86%85HTTP%E5%85%A8%E6%97%B6%E6%AE%B5%E9%9D%99%E6%80%81%E5%8A%A0%E9%80%9F%E6%B5%81%E9%87%8F%26capacity%3D10TB'</script>"]);
    dsy.add("0_1", ["闲时段", "全时段"]);
    $("select[name='alongwith_type5'],select[name='alongwith_time5']").change(function() {
      select(this.name == 'alongwith_type5' ? 0 : 1);
    });
    function select(index) {
      var tv = index >= 0 ? $("select[name=" + s[index] + "]").val() : "0";
      var arr = dsy.Items[tv],
      i = 0,
      html = "";
      if (arr) {
        for (i = arr.length; i--;) {
          html += index == 1 ? arr[i] : '<option value="' + tv + '_' + i + '">' + arr[i] + '</option>';
        }
  
        $("#" + s[++index]).html(html);
        index < 2 && select(index);
      } else {
        for (i = 2; i > index; i--) {
          $("select[name=" + s[i] + "]").empty();
        }
      }
    }
    select( - 1);
  }
})

$(function() {
  $fusionPackageEventPage = $('.events-page-fusion_package .fusion-package-page');
  if ($fusionPackageEventPage.length > 0) {
    function Dsy() {
      this.Items = {};
    }
    Dsy.prototype.add = function(id, iArray) {
      this.Items[id] = iArray;
    };
    var dsy = new Dsy();
    var s = ["alongwith_type6", "alongwith_time6", "alongwith_Price6"];
    dsy.add("0", ["HTTPS", "HTTP"]);
    dsy.add("0_0_0", ["￥94,372<br><span>省 ￥199,229</span><script>alongwith_type6='https://portal.qiniu.com/financial/respack/fusion-composite?settlement%3Dlifetime%26type%3D%E5%9B%BD%E5%86%85HTTPS%E9%97%B2%E6%97%B6%E6%AE%B5%E9%9D%99%E6%80%81%E5%8A%A0%E9%80%9F%E6%B5%81%E9%87%8F%26capacity%3D1PB'</script>"]);
    dsy.add("0_0_1", ["￥175,636<br><span>省 ￥117,965</span><script>alongwith_type6='https://portal.qiniu.com/financial/respack/fusion-composite?settlement%3Dlifetime%26type%3D%E5%9B%BD%E5%86%85HTTPS%E5%85%A8%E6%97%B6%E6%AE%B5%E9%9D%99%E6%80%81%E5%8A%A0%E9%80%9F%E6%B5%81%E9%87%8F%26capacity%3D1PB'</script>"]);
    dsy.add("0_0", ["闲时段", "全时段"]);
    dsy.add("0_1_0", ["￥73,400<br><span>省 ￥125,829</span><script>alongwith_type6='https://portal.qiniu.com/financial/respack/fusion-composite?settlement%3Dlifetime%26type%3D%E5%9B%BD%E5%86%85HTTP%E9%97%B2%E6%97%B6%E6%AE%B5%E9%9D%99%E6%80%81%E5%8A%A0%E9%80%9F%E6%B5%81%E9%87%8F%26capacity%3D1PB'</script>"]);
    dsy.add("0_1_1", ["￥140,509<br><span>省 ￥58,720</span><script>alongwith_type6='https://portal.qiniu.com/financial/respack/fusion-composite?settlement%3Dlifetime%26type%3D%E5%9B%BD%E5%86%85HTTP%E5%85%A8%E6%97%B6%E6%AE%B5%E9%9D%99%E6%80%81%E5%8A%A0%E9%80%9F%E6%B5%81%E9%87%8F%26capacity%3D1PB'</script>"]);
    dsy.add("0_1", ["闲时段", "全时段"]);
    $("select[name='alongwith_type6'],select[name='alongwith_time6']").change(function() {
      select(this.name == 'alongwith_type6' ? 0 : 1);
    });
    function select(index) {
      var tv = index >= 0 ? $("select[name=" + s[index] + "]").val() : "0";
      var arr = dsy.Items[tv],
      i = 0,
      html = "";
      if (arr) {
        for (i = arr.length; i--;) {
          html += index == 1 ? arr[i] : '<option value="' + tv + '_' + i + '">' + arr[i] + '</option>';
        }
  
        $("#" + s[++index]).html(html);
        index < 2 && select(index);
      } else {
        for (i = 2; i > index; i--) {
          $("select[name=" + s[i] + "]").empty();
        }
      }
    }
    select( - 1);
  }
})

$(function() {
  $fusionPackageEventPage = $('.events-page-fusion_package .fusion-package-page');
  if ($fusionPackageEventPage.length > 0) {
    function Dsy() {
      this.Items = {};
    }
    Dsy.prototype.add = function(id, iArray) {
      this.Items[id] = iArray;
    };
    var dsy = new Dsy();
    var s = ["fixed_type", "fixed_time", "fixed_Price"];
    dsy.add("0", ["HTTPS", "HTTP"]);
    dsy.add("0_0_0", ["￥132<br><span>省 ￥204</span><script>fixed_type='https://portal.qiniu.com/financial/respack/fusion-composite?settlement%3Dminimum%26type%3D%E5%9B%BD%E5%86%85HTTPS%E9%97%B2%E6%97%B6%E6%AE%B5%E9%9D%99%E6%80%81%E5%8A%A0%E9%80%9F%E6%B5%81%E9%87%8F%26capacity%3D50GB'</script>"]);
    dsy.add("0_0_1", ["￥216<br><span>省 ￥120</span><script>fixed_type='https://portal.qiniu.com/financial/respack/fusion-composite?settlement%3Dminimum%26type%3D%E5%9B%BD%E5%86%85HTTPS%E5%85%A8%E6%97%B6%E6%AE%B5%E9%9D%99%E6%80%81%E5%8A%A0%E9%80%9F%E6%B5%81%E9%87%8F%26capacity%3D50GB'</script>"]);
    dsy.add("0_0", ["闲时段", "全时段"]);
    dsy.add("0_1_0", ["￥120<br><span>省 ￥168</span><script>fixed_type='https://portal.qiniu.com/financial/respack/fusion-composite?settlement%3Dminimum%26type%3D%E5%9B%BD%E5%86%85HTTP%E9%97%B2%E6%97%B6%E6%AE%B5%E9%9D%99%E6%80%81%E5%8A%A0%E9%80%9F%E6%B5%81%E9%87%8F%26capacity%3D50GB'</script>"]);
    dsy.add("0_1_1", ["￥174<br><span>省 ￥114</span><script>fixed_type='https://portal.qiniu.com/financial/respack/fusion-composite?settlement%3Dminimum%26type%3D%E5%9B%BD%E5%86%85HTTP%E5%85%A8%E6%97%B6%E6%AE%B5%E9%9D%99%E6%80%81%E5%8A%A0%E9%80%9F%E6%B5%81%E9%87%8F%26capacity%3D50GB'</script>"]);
    dsy.add("0_1", ["闲时段", "全时段"]);
    $("select[name='fixed_type'],select[name='fixed_time']").change(function() {
      select(this.name == 'fixed_type' ? 0 : 1);
    });
    function select(index) {
      var tv = index >= 0 ? $("select[name=" + s[index] + "]").val() : "0";
      var arr = dsy.Items[tv],
      i = 0,
      html = "";
      if (arr) {
        for (i = arr.length; i--;) {
          html += index == 1 ? arr[i] : '<option value="' + tv + '_' + i + '">' + arr[i] + '</option>';
        }
  
        $("#" + s[++index]).html(html);
        index < 2 && select(index);
      } else {
        for (i = 2; i > index; i--) {
          $("select[name=" + s[i] + "]").empty();
        }
      }
    }
    select( - 1);
  }
})

$(function() {
  $fusionPackageEventPage = $('.events-page-fusion_package .fusion-package-page');
  if ($fusionPackageEventPage.length > 0) {
    function Dsy() {
      this.Items = {};
    }
    Dsy.prototype.add = function(id, iArray) {
      this.Items[id] = iArray;
    };
    var dsy = new Dsy();
    var s = ["fixed_type2", "fixed_time2", "fixed_Price2"];
    dsy.add("0", ["HTTPS", "HTTP"]);
    dsy.add("0_0_0", ["￥240<br><span>省 ￥432</span><script>fixed_type2='https://portal.qiniu.com/financial/respack/fusion-composite?settlement%3Dminimum%26type%3D%E5%9B%BD%E5%86%85HTTPS%E9%97%B2%E6%97%B6%E6%AE%B5%E9%9D%99%E6%80%81%E5%8A%A0%E9%80%9F%E6%B5%81%E9%87%8F%26capacity%3D100GB'</script>"]);
    dsy.add("0_0_1", ["￥420<br><span>省 ￥252</span><script>fixed_type2='https://portal.qiniu.com/financial/respack/fusion-composite?settlement%3Dminimum%26type%3D%E5%9B%BD%E5%86%85HTTPS%E5%85%A8%E6%97%B6%E6%AE%B5%E9%9D%99%E6%80%81%E5%8A%A0%E9%80%9F%E6%B5%81%E9%87%8F%26capacity%3D100GB'</script>"]);
    dsy.add("0_0", ["闲时段", "全时段"]);
    dsy.add("0_1_0", ["￥204<br><span>省 ￥372</span><script>fixed_type2='https://portal.qiniu.com/financial/respack/fusion-composite?settlement%3Dminimum%26type%3D%E5%9B%BD%E5%86%85HTTP%E9%97%B2%E6%97%B6%E6%AE%B5%E9%9D%99%E6%80%81%E5%8A%A0%E9%80%9F%E6%B5%81%E9%87%8F%26capacity%3D100GB'</script>"]);
    dsy.add("0_1_1", ["￥336<br><span>省 ￥240</span><script>fixed_type2='https://portal.qiniu.com/financial/respack/fusion-composite?settlement%3Dminimum%26type%3D%E5%9B%BD%E5%86%85HTTP%E5%85%A8%E6%97%B6%E6%AE%B5%E9%9D%99%E6%80%81%E5%8A%A0%E9%80%9F%E6%B5%81%E9%87%8F%26capacity%3D100GB'</script>"]);
    dsy.add("0_1", ["闲时段", "全时段"]);
    $("select[name='fixed_type2'],select[name='fixed_time2']").change(function() {
      select(this.name == 'fixed_type2' ? 0 : 1);
    });
    function select(index) {
      var tv = index >= 0 ? $("select[name=" + s[index] + "]").val() : "0";
      var arr = dsy.Items[tv],
      i = 0,
      html = "";
      if (arr) {
        for (i = arr.length; i--;) {
          html += index == 1 ? arr[i] : '<option value="' + tv + '_' + i + '">' + arr[i] + '</option>';
        }
  
        $("#" + s[++index]).html(html);
        index < 2 && select(index);
      } else {
        for (i = 2; i > index; i--) {
          $("select[name=" + s[i] + "]").empty();
        }
      }
    }
    select( - 1);
  }
})

$(function() {
  $fusionPackageEventPage = $('.events-page-fusion_package .fusion-package-page');
  if ($fusionPackageEventPage.length > 0) {
    function Dsy() {
      this.Items = {};
    }
    Dsy.prototype.add = function(id, iArray) {
      this.Items[id] = iArray;
    };
    var dsy = new Dsy();
    var s = ["fixed_type3", "fixed_time3", "fixed_Price3"];
    dsy.add("0", ["HTTPS", "HTTP"]);
    dsy.add("0_0_0", ["￥1,164<br><span>省 ￥2,196</span><script>fixed_type3='https://portal.qiniu.com/financial/respack/fusion-composite?settlement%3Dminimum%26type%3D%E5%9B%BD%E5%86%85HTTPS%E9%97%B2%E6%97%B6%E6%AE%B5%E9%9D%99%E6%80%81%E5%8A%A0%E9%80%9F%E6%B5%81%E9%87%8F%26capacity%3D500GB'</script>"]);
    dsy.add("0_0_1", ["￥2,028<br><span>省 ￥1,332</span><script>fixed_type3='https://portal.qiniu.com/financial/respack/fusion-composite?settlement%3Dminimum%26type%3D%E5%9B%BD%E5%86%85HTTPS%E5%85%A8%E6%97%B6%E6%AE%B5%E9%9D%99%E6%80%81%E5%8A%A0%E9%80%9F%E6%B5%81%E9%87%8F%26capacity%3D500GB'</script>"]);
    dsy.add("0_0", ["闲时段", "全时段"]);
    dsy.add("0_1_0", ["￥996<br><span>省 ￥1,884</span><script>fixed_type3='https://portal.qiniu.com/financial/respack/fusion-composite?settlement%3Dminimum%26type%3D%E5%9B%BD%E5%86%85HTTP%E9%97%B2%E6%97%B6%E6%AE%B5%E9%9D%99%E6%80%81%E5%8A%A0%E9%80%9F%E6%B5%81%E9%87%8F%26capacity%3D500GB'</script>"]);
    dsy.add("0_1_1", ["￥1,620<br><span>省 ￥1,260</span><script>fixed_type3='https://portal.qiniu.com/financial/respack/fusion-composite?settlement%3Dminimum%26type%3D%E5%9B%BD%E5%86%85HTTP%E5%85%A8%E6%97%B6%E6%AE%B5%E9%9D%99%E6%80%81%E5%8A%A0%E9%80%9F%E6%B5%81%E9%87%8F%26capacity%3D500GB'</script>"]);
    dsy.add("0_1", ["闲时段", "全时段"]);
    $("select[name='fixed_type3'],select[name='fixed_time3']").change(function() {
      select(this.name == 'fixed_type3' ? 0 : 1);
    });
    function select(index) {
      var tv = index >= 0 ? $("select[name=" + s[index] + "]").val() : "0";
      var arr = dsy.Items[tv],
      i = 0,
      html = "";
      if (arr) {
        for (i = arr.length; i--;) {
          html += index == 1 ? arr[i] : '<option value="' + tv + '_' + i + '">' + arr[i] + '</option>';
        }
  
        $("#" + s[++index]).html(html);
        index < 2 && select(index);
      } else {
        for (i = 2; i > index; i--) {
          $("select[name=" + s[i] + "]").empty();
        }
      }
    }
    select( - 1);
  }
})

$(function() {
  $fusionPackageEventPage = $('.events-page-fusion_package .fusion-package-page');
  if ($fusionPackageEventPage.length > 0) {
    function Dsy() {
      this.Items = {};
    }
    Dsy.prototype.add = function(id, iArray) {
      this.Items[id] = iArray;
    };
    var dsy = new Dsy();
    var s = ["fixed_type4", "fixed_time4", "fixed_Price4"];
    dsy.add("0", ["HTTPS", "HTTP"]);
    dsy.add("0_0_0", ["￥1,908<br><span>省 ￥4,973</span><script>fixed_type4='https://portal.qiniu.com/financial/respack/fusion-composite?settlement%3Dminimum%26type%3D%E5%9B%BD%E5%86%85HTTPS%E9%97%B2%E6%97%B6%E6%AE%B5%E9%9D%99%E6%80%81%E5%8A%A0%E9%80%9F%E6%B5%81%E9%87%8F%26capacity%3D1TB'</script>"]);
    dsy.add("0_0_1", ["￥4,008<br><span>省 ￥2,873</span><script>fixed_type4='https://portal.qiniu.com/financial/respack/fusion-composite?settlement%3Dminimum%26type%3D%E5%9B%BD%E5%86%85HTTPS%E5%85%A8%E6%97%B6%E6%AE%B5%E9%9D%99%E6%80%81%E5%8A%A0%E9%80%9F%E6%B5%81%E9%87%8F%26capacity%3D1TB'</script>"]);
    dsy.add("0_0", ["闲时段", "全时段"]);
    dsy.add("0_1_0", ["￥1,572<br><span>省 ￥4,323</span><script>fixed_type4='https://portal.qiniu.com/financial/respack/fusion-composite?settlement%3Dminimum%26type%3D%E5%9B%BD%E5%86%85HTTP%E9%97%B2%E6%97%B6%E6%AE%B5%E9%9D%99%E6%80%81%E5%8A%A0%E9%80%9F%E6%B5%81%E9%87%8F%26capacity%3D1TB'</script>"]);
    dsy.add("0_1_1", ["￥3,204<br><span>省 ￥2,694</span><script>fixed_type4='https://portal.qiniu.com/financial/respack/fusion-composite?settlement%3Dminimum%26type%3D%E5%9B%BD%E5%86%85HTTP%E5%85%A8%E6%97%B6%E6%AE%B5%E9%9D%99%E6%80%81%E5%8A%A0%E9%80%9F%E6%B5%81%E9%87%8F%26capacity%3D1TB'</script>"]);
    dsy.add("0_1", ["闲时段", "全时段"]);
    $("select[name='fixed_type4'],select[name='fixed_time4']").change(function() {
      select(this.name == 'fixed_type4' ? 0 : 1);
    });
    function select(index) {
      var tv = index >= 0 ? $("select[name=" + s[index] + "]").val() : "0";
      var arr = dsy.Items[tv],
      i = 0,
      html = "";
      if (arr) {
        for (i = arr.length; i--;) {
          html += index == 1 ? arr[i] : '<option value="' + tv + '_' + i + '">' + arr[i] + '</option>';
        }
  
        $("#" + s[++index]).html(html);
        index < 2 && select(index);
      } else {
        for (i = 2; i > index; i--) {
          $("select[name=" + s[i] + "]").empty();
        }
      }
    }
    select( - 1);
  }
})

function fusionPackageMoveClass(obj) {
  $(obj).addClass("active").siblings().removeClass("active");
}
