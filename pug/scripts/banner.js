function hideFooter() {
    var footer = document.querySelector(`footer`);
    footer.style.display = `none`;
    localStorage.setItem(`footerAcknowledged`, `true`);
  }

  window.onload = function() {
    var acknowledged = localStorage.getItem(`footerAcknowledged`);
    if (!acknowledged) {
      var footer = document.querySelector(`footer`);
      footer.style.display = `block`;
    }
  };

