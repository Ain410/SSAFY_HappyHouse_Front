<template>
  <div class="container text-center mt-3">
    <div class="col-lg-8 mx-auto">
      <h2 class="p-3 mb-3 shadow bg-light">
        <mark class="orange">동별검색</mark>
      </h2>
    </div>

    <div class="card col-sm-12 mt-1" style="min-height: 850px">
      <div class="card-body">
        <div class="m-3 row">
          <form id="searchform" class="form-inline" method="get">
            <input
              type="text"
              class="ml-1 form-control"
              id="sword"
              name="word"
              placeholder="동입력"
            />
            <button
              type="button"
              id="searchBtn"
              class="ml-1 btn btn-outline-primary"
            >
              검색
            </button>
          </form>
        </div>

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
  name: "SearchDong",
};
</script>

<style></style>
