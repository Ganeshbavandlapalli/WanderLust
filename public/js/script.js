<script>
(() => {
  'use strict';

  const forms = document.querySelectorAll('.needs-validation');

  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {

      // ❌ STOP submission if invalid
      if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
      }

      // ✅ Trigger Bootstrap validation styles
      form.classList.add('was-validated');

    }, false);
  });
})();
</script>
