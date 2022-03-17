<template>
  <div>
    <VueFileAgent
      ref="vueFileAgent"
      :uploadUrl="uploadUrl"
      :theme="'list'"
      :multiple="true"
      :deletable="true"
      :linkable="true"
      :meta="true"
      :accept="'image/*,.zip'"
      :helpText="'부동산 이미지를 자유롭게 업로드해주세요!'"
      @select="filesSelected($event)"
      @delete="fileDeleted($event)"
      v-model="fileRecords"
    ></VueFileAgent>
  </div>
</template>

<script>
// Reference: https://madewithvuejs.com/vue-file-agent
export default {
  data() {
    return {
      fileRecords: [],
      uploadUrl: `/api/upload/${this.estateID}`,
      uploadHeaders: { "X-Test-Header": "vue-file-agent" },
      fileRecordsForUpload: [], // maintain an upload queue
    };
  },
  props: {
    estateID: {
      type: String,
      required: true,
      validator: function(value) {
        return value != null;
      },
    },
  },
  methods: {
    uploadFiles() {
      // Using the default uploader. You may use another uploader instead.
      this.$refs.vueFileAgent.upload(this.uploadUrl, this.uploadHeaders, this.fileRecordsForUpload);
      this.fileRecordsForUpload = [];
    },
    deleteUploadedFile(fileRecord) {
      // Using the default uploader. You may use another uploader instead.
      this.$refs.vueFileAgent.deleteUpload(this.uploadUrl, this.uploadHeaders, fileRecord);
    },
    filesSelected(fileRecordsNewlySelected) {
      const validFileRecords = fileRecordsNewlySelected.filter((fileRecord) => !fileRecord.error);
      this.fileRecordsForUpload = this.fileRecordsForUpload.concat(validFileRecords);
    },
    fileDeleted(fileRecord) {
      if (!confirm("정말로 이미지를 삭제하시겠습니까?")) return;

      const i = this.fileRecordsForUpload.indexOf(fileRecord);
      if (i !== -1) {
        this.fileRecordsForUpload.splice(i, 1);
      } else {
        this.deleteUploadedFile(fileRecord);
      }
    },
  },
};
</script>
