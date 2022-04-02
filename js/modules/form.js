import { openModal } from "./modal";
import { closeModal } from "./modal";
function form(modalTimer) {
  const forms = document.querySelectorAll("form");

  const message = {
    loading: "img/form/spinner.svg",
    success: "Murojatingiz qabul qilindi",
    failure: "Error",
  };

  forms.forEach((item) => {
    bindpostData(item);
  });

  const postdata = async (url, data) => {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },

      body: data,
    });

    return await res.json();
  };

  function bindpostData(form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const statusMessage = document.createElement("img");
      statusMessage.src = message.loading;
      statusMessage.style.cssText = `
        display: block;
        margin: 0 auto
      `;
      form.insertAdjacentElement("afterend", statusMessage);

      // const request = new XMLHttpRequest();
      // request.open("POST", "server.php");
      // request.setRequestHeader("Content-type", "application/json");
      const formData = new FormData(form);

      const json = JSON.stringify(Object.fromEntries(formData.entries()));
      const axiosJson = Object.fromEntries(formData.entries());

      postdata("http://localhost:3000/request", json)
        .then((data) => {
          console.log(data);
          showThanksModal(message.success);
          statusMessage.remove();
        })
        .catch(() => {
          showThanksModal(message.failure);
          statusMessage.remove();
        })
        .finally(() => {
          form.reset();
        });

      // axiosPostData("http://localhost:3000/request", axiosJson)
      //   .then((data) => {
      //     console.log(data);
      //     showThanksModal(message.success);
      //     statusMessage.remove();
      //   })
      //   .catch(() => {
      //     showThanksModal(message.failure);
      //     statusMessage.remove();
      //   })
      //   .finally(() => {
      //     form.reset();
      //   });

      // function axiosPostData(url, data) {
      //   const res = axios.post(url, {
      //     body: data,
      //   });

      //   return res;
      // }

      // axios
      //   .post("http://localhost:3000/request", {
      //     body: axiosJson
      //   })
      //   .then((data) => {
      //     console.log(axiosJson);
      //     console.log(data);
      //     showThanksModal(message.success);
      //     statusMessage.remove();
      //   })
      //   .catch(() => {
      //     showThanksModal(message.failure);
      //     statusMessage.remove();
      //   })
      //   .finally(() => {
      //     form.reset();
      //   });

      // request.addEventListener("load", () => {
      //   if (request.status === 200) {
      //     console.log(request.response);
      //     showThanksModal(message.success);
      //     form.reset();
      //     statusMessage.remove();
      //   } else {
      //     showThanksModal(message.failure);
      //   }
      // });
    });
  }

  function showThanksModal(message) {
    const prevModalDialog = document.querySelector(".modal__dialog");

    prevModalDialog.classList.add("hide");
    openModal(".modal", modalTimer)

    const thanksModal = document.createElement("div");
    thanksModal.classList.add("modal__dialog");
    thanksModal.innerHTML = `
      <div class="modal__content">
        <div class="modal__close" data-close>×</div>
        <div class="modal__title">${message}</div>
      </div>
    `;

    document.querySelector(".modal").append(thanksModal);
    setTimeout(() => {
      thanksModal.remove();
      prevModalDialog.classList.add("show");
      prevModalDialog.classList.remove("hide");
      closeModal(".modal");
    }, 4000);
  }

}

export default form;
