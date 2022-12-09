function displayModal(title, text, icon) {
  Swal.fire({ title, text, icon });
}

function displayToast(title, icon, color, time = 1500) {
  const toast = Swal.mixin({
    toast: true,
    position: "top-right",
    inconColor: color,
    costumeClass: {
      popup: "colored-toast",
    },
    showConfireButton: true,
    time: time,
    timeProgressBar: true,
  });
  toast.fire({ title, icon });
}
