<script>
  export let file;
  import {aspectRatio} from '../utils';
</script>

<style type="text/scss">
  .image {
    position: relative;
    img { width: 100%; }
    margin-bottom: -4px;

    .info {
      position: absolute;
      left: 0;
      bottom: 4px;
      padding: 3px;
      font-size: .7em;
      background-color: rgba(#000, 0.3);
      border-radius: 0 3px 0 0;
    }
    .previews {
      $size: 200px;
      position:absolute;
      left:0;
      right:0;
      top: calc(50% - #{$size/2});
      height: $size;

      & > * {
        &:hover {
          background-color: #FFF5;
          cursor: pointer;
        }
        
        -webkit-mask-repeat: no-repeat;
        mask-repeat: no-repeat;
        -webkit-mask-size: 40%;
        mask-size: 40%;
        -webkit-mask-position: center;
        mask-position: center;
      }
      .preview-stretch, .preview-stretch::before {
        -webkit-mask-image: url('~@icon/themify-icons/icons/fullscreen.svg');
        mask-image: url('~@icon/themify-icons/icons/fullscreen.svg');
      }
      .preview-fill, .preview-fill::before {
        -webkit-mask-image: url('~@icon/themify-icons/icons/arrows-horizontal.svg');
        mask-image: url('~@icon/themify-icons/icons/arrows-horizontal.svg');
      }
      .preview-fit, .preview-fit::before {
        -webkit-mask-image: url('~@icon/themify-icons/icons/layout-sidebar-2.svg');
        mask-image: url('~@icon/themify-icons/icons/layout-sidebar-2.svg');
      }
    }
    .controls {
      position: absolute;
      right: 0;
      bottom: 4px;
      i {
        display: inline-block;
        width: 30px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        background-color: rgba(#000, 0.3);
        cursor: pointer;
        &:first-child {
          border-radius: 3px 0 0 0;
        }
        &:hover {
          background-color: rgba(#FFF, 0.2);
        }
      }
    }
  }
</style>

<div class="image">
  <img src={`/image/${file.Root}/${file.Path}`} alt={file.Path}/>
  <div class="info">
    <span>{file.Size[0]}×{file.Size[1]} ({aspectRatio(file.Size[0], file.Size[1])})</span>
    <span> - {file.Path.split('.').at(-1)}</span>
  </div>
  <div class="previews horiz align-center">
  </div>
</div>