<template>
  <div class="home">
    <div class="card col-sm-12 mt-1" style="min-height: 850px">
      <div class="card-body">
        시도 :
        <select id="sido">
          <option value="0">선택</option>
        </select>
        구군 :
        <select id="gugun">
          <option value="0">선택</option>
        </select>
        읍면동 :
        <select id="dong">
          <option value="0">선택</option>
        </select>
        <button type="button" id="aptSearchBtn">검색</button>
        <table class="table mt-2">
          <colgroup>
            <col width="100" />
            <col width="150" />
            <col width="*" />
            <col width="120" />
            <col width="120" />
          </colgroup>
          <thead>
            <tr>
              <th>번호</th>
              <th>아파트이름</th>
              <th class="text-center">주소</th>
              <th>건축연도</th>
              <th>최근거래금액</th>
            </tr>
          </thead>
          <tbody id="searchResult"></tbody>
        </table>
        <div id="map" style="width: 100%; height: 500px"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  components: {},
};
</script>

<style></style>

<style></style>

<style></style>
