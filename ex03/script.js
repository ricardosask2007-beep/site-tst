function adicionarDados() {
  const nome  = document.getElementById("nome").value.trim();
  const email = document.getElementById("email").value.trim();
  const sexo  = document.getElementById("sexo").value;
  const turma = document.getElementById("turma").value;

const labelTurma = {
  turma_a: "1ESAN (A)",
  turma_b: "1ESBN (B)",
  turma_c: "1ESCN (C)"
};
const labelSexo = {
    masculino: "Masculino",
    feminino: "Feminino",
    outro: "Outro"
};
  if (!nome || !email) {
    alert("Preencha todos os campos!");
    return;
  }
  const usuario = { id: Date.now(), nome, email, sexo, turma };

  InfoTabela.push(usuario);
  renderizarTabela();
  limparFormulario();
}
function renderizarTabela() {
  const corpo = document.getElementById("corpo_tabela");
  corpo.innerHTML = "";
  if (InfoTabela.length === 0) {
    corpo.innerHTML = '<tr><td colspan="5">Nenhum usuário cadastrado.</td></tr>';
    return;
  }

  InfoTabela.forEach(usuario => {
    const linha = document.createElement("tr");
    linha.id = "linha-" + usuario.id;
    linha.innerHTML = `
      <td>${usuario.nome}</td>
      <td>${usuario.email}</td>
      <td>${labelSexo[usuario.sexo]}</td>
      <td>${labelTurma[usuario.turma]}</td>
      <td>
        <button onclick="editarDados(${usuario.id})">✏️ Editar</button>
        <button onclick="excluirDados(${usuario.id})">🗑️ Excluir</button>
      </td>
    `;
    corpo.appendChild(linha);
  });
}
function editarDados(id) {
  const usuario = InfoTabela.find(u => u.id === id);
  if (!usuario) return;

  const linha = document.getElementById("linha-" + id);

  linha.innerHTML = `
    <td><input type="text" id="edit-nome-${id}" value="${usuario.nome}"></td>
    <td><input type="email" id="edit-email-${id}" value="${usuario.email}"></td>
    <td>
      <select id="edit-sexo-${id}">
        <option value="masculino" ${usuario.sexo === "masculino" ? "selected" : ""}>Masculino</option>
        <option value="feminino"  ${usuario.sexo === "feminino"  ? "selected" : ""}>Feminino</option>
        <option value="outro"     ${usuario.sexo === "outro"     ? "selected" : ""}>Outro</option>
      </select>
    </td>
    <td>
      <select id="edit-turma-${id}">
        <option value="turma_a" ${usuario.turma === "turma_a" ? "selected" : ""}>1ESAN (A)</option>
        <option value="turma_b" ${usuario.turma === "turma_b" ? "selected" : ""}>1ESBN (B)</option>
        <option value="turma_c" ${usuario.turma === "turma_c" ? "selected" : ""}>1ESCN (C)</option>
      </select>
    </td>
    <td>
      <button onclick="salvarEdicao(${id})">💾 Salvar</button>
      <button onclick="renderizarTabela()">✖ Cancelar</button>
    </td>
  `;
}
function salvarEdicao(id) {
  const index = InfoTabela.findIndex(u => u.id === id);
  if (index === -1) return;

  const novoNome  = document.getElementById("edit-nome-"  + id).value.trim();
  const novoEmail = document.getElementById("edit-email-" + id).value.trim();
  const novoSexo  = document.getElementById("edit-sexo-"  + id).value;
  const novaTurma = document.getElementById("edit-turma-" + id).value;

  if (!novoNome || !novoEmail) {
    alert("Preencha todos os campos!");
    return;
  }

  InfoTabela[index] = { id, nome: novoNome, email: novoEmail, sexo: novoSexo, turma: novaTurma };
  renderizarTabela();
}

function excluirDados(id) {
  if (!confirm("Tem certeza que deseja excluir este usuário?")) return;

  const index = InfoTabela.findIndex(u => u.id === id);
  if (index !== -1) {
    InfoTabela.splice(index, 1);
    renderizarTabela();
  }
}

// Limpa os campos após cadastrar
function limparFormulario() {
  document.getElementById("nome").value  = "";
  document.getElementById("email").value = "";
  document.getElementById("sexo").value  = "masculino";
  document.getElementById("turma").value = "turma_a";
}