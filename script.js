// topo do script.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore, collection, doc, setDoc, getDoc, addDoc, getDocs, deleteDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCXB6lJFAVcBNQ5VFp0Pbr-wuZbEp5m4AQ",
  authDomain: "caraquinhas-drop.firebaseapp.com",
  projectId: "caraquinhas-drop",
  storageBucket: "caraquinhas-drop.appspot.com",
  messagingSenderId: "102170747527",
  appId: "1:102170747527:web:a21c2bbd0fcefd31684e22"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Formatar CP
function formatarCP(valor) {
  if (valor >= 1e9) return (valor / 1e9).toFixed(1) + "B";
  if (valor >= 1e6) return (valor / 1e6).toFixed(1) + "M";
  return valor.toString();
}

// Listar Jogadores
async function listarJogadores() {
  const lista = document.getElementById("lista-jogadores");
  lista.innerHTML = "";
  const snap = await getDocs(collection(db, "jogadores"));
  snap.forEach(docSnap => {
    const j = docSnap.data();
    const li = document.createElement("li");
    li.innerHTML = `${docSnap.id} - Classe: ${j.classe}, CP: ${formatarCP(j.cp)}, Nivel: ${j.nivel}
      <button class="acao-btn editar-jogador" data-id="${docSnap.id}">✏️</button>
      <button class="acao-btn excluir-jogador" data-id="${docSnap.id}">❌</button>`;
    lista.appendChild(li);
  });

  document.querySelectorAll(".excluir-jogador").forEach(btn => {
    btn.addEventListener("click", async () => {
      if (confirm("Deseja excluir este jogador?")) {
        await deleteDoc(doc(db, "jogadores", btn.dataset.id));
        listarJogadores();
      }
    });
  });

  document.querySelectorAll(".editar-jogador").forEach(btn => {
    btn.addEventListener("click", async () => {
      const docSnap = await getDoc(doc(db, "jogadores", btn.dataset.id));
      if (docSnap.exists()) {
        const dados = docSnap.data();
        document.getElementById("nick").value = docSnap.id;
        document.getElementById("classe").value = dados.classe;
        document.getElementById("cp").value = dados.cp;
        document.getElementById("nivel").value = dados.nivel;
      }
    });
  });
}

// Listar Itens
async function listarItens() {
  const lista = document.getElementById("lista-itens");
  lista.innerHTML = "";
  const snap = await getDocs(collection(db, "itens"));
  snap.forEach(docSnap => {
    const i = docSnap.data();
    const li = document.createElement("li");
    li.innerHTML = `${docSnap.id} - CP Min: ${formatarCP(i.cpMin)}, Nivel Min: ${i.nivelMin}
      <button class="acao-btn editar-item" data-id="${docSnap.id}">✏️</button>
      <button class="acao-btn excluir-item" data-id="${docSnap.id}">❌</button>`;
    lista.appendChild(li);
  });

  document.querySelectorAll(".excluir-item").forEach(btn => {
    btn.addEventListener("click", async () => {
      if (confirm("Deseja excluir este item?")) {
        await deleteDoc(doc(db, "itens", btn.dataset.id));
        listarItens();
      }
    });
  });

  document.querySelectorAll(".editar-item").forEach(btn => {
    btn.addEventListener("click", async () => {
      const docSnap = await getDoc(doc(db, "itens", btn.dataset.id));
      if (docSnap.exists()) {
        const dados = docSnap.data();
        document.getElementById("item-nome").value = docSnap.id;
        document.getElementById("item-cp").value = dados.cpMin;
        document.getElementById("item-nivel").value = dados.nivelMin;
      }
    });
  });
}
