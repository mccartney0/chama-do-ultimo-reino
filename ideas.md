# Direção de Design — A Chama do Último Reino

## Três abordagens consideradas

### 1. Arquivo das Cinzas
**Muito breve:** Uma experiência de códice proibido encontrado nas ruínas de Asterion, em que pergaminho carbonizado, luz ritual e tipografia literária se cruzam. A emoção é de descoberta: o visitante abre uma memória que insistiu em sobreviver.

**Probabilidade:** 0.037

### 2. Estrada do Norte
**Muito breve:** Uma página editorial de jornada, feita como um mapa de expedição com marcos, bifurcações e rastros de fogo azul. O tom é aventureiro e contemplativo, puxando o visitante em direção à Casa sem Sol.

**Probabilidade:** 0.081

### 3. Coroa Partida
**Muito breve:** Um cartaz de guerra monumental, com recortes de pedra, insígnias em metal e contrastes dourado-cinza. A experiência enfatiza o confronto entre o Rei das Cinzas e quem escolheu recusá-lo.

**Probabilidade:** 0.014

---

## Abordagem escolhida: Arquivo das Cinzas

### Movimento de design
**Romantismo gótico editorial**, reinterpretado para uma interface contemporânea. A página se comporta como um fragmento de arquivo histórico e não como uma landing page comercial convencional.

### Princípios centrais

1. **Descoberta antes de explicação:** as informações surgem como páginas, selos, anotações e fragmentos recuperados do universo.
2. **Escuridão legível:** fundos de carvão e azul-noite enquadram texto marfim, preservando contraste e o tom de fantasia sombria.
3. **Assimetria cerimonial:** imagens verticais, notas marginais e cortes diagonais evitam uma composição centralizada e previsível.
4. **Matéria e vestígio:** linhas de runas, grão sutil, bordas queimadas e detalhes de selo dão densidade tátil sem transformar a interface em decoração excessiva.

### Filosofia de cor
O **preto de cinza** cria o silêncio e o perigo de Asterion; o **marfim de papel antigo** torna os trechos literários acolhedores e legíveis; o **azul-chama** representa Kael e a memória; e o **ouro de brasa** aparece em pequenas ações e no poder de Dharen. As cores vivas são raras e, por isso, carregam significado narrativo.

### Paradigma de layout
Uma **mesa de arquivo em camadas**: a abertura é uma composição de arte vertical e tipografia deslocada; as seções seguintes parecem folhas e fichas sobrepostas em um fundo mineral. Em desktop, cada bloco alterna uma coluna de leitura longa com uma coluna de evidência visual ou metadados. Em dispositivos pequenos, a leitura passa para uma única trilha contínua sem perder as notas laterais.

### Elementos de assinatura

1. Uma **marca-runa flamejante** de três traços, repetida no cabeçalho, marcadores de seção e favicon.
2. Uma **linha de percurso dourada** atravessando a página, conectando prólogo, personagens, sigilos e o norte.
3. **Cartelas de arquivo** com bordas de canto, pequenas coordenadas e palavras em caixa alta, usadas em vez de cartões genéricos arredondados.

### Filosofia de interação
O visitante não “navega por blocos”; ele **desvela documentos**. Os controles de capítulos filtram e revelam fragmentos; as fichas de personagens respondem ao foco com detalhes; os trechos citados podem ser copiados. Cada retorno visual é curto, claro e com intenção narrativa.

### Animação
As revelações acompanham o ritmo da leitura: blocos emergem em até 520 ms com opacidade e leve deslocamento vertical; a linha de percurso parece avançar à medida que o usuário rola; faíscas e halos respiram lentamente apenas em áreas mágicas. Botões respondem em até 160 ms. Nenhum movimento é essencial para acessar conteúdo, e as animações são removidas com `prefers-reduced-motion`.

### Sistema tipográfico
**Cormorant Garamond** é a voz do mundo: títulos, citações e números de capítulo em pesos semibold e bold. **Manrope** organiza a leitura funcional: rótulos, sinopses, controles e metadados. Os títulos têm espaçamento contido e escala dramática; o corpo conserva entrelinha generosa, evitando qualquer fonte genérica de interface como única linguagem visual.

### Essência da marca
**Uma fantasia épica de ruínas, memória e escolha para leitores que querem atravessar um reino sem permitir que um rei escreva seu destino.**

Personalidade: **solene, humana, incandescente**.

### Voz da marca
As manchetes soam como inscrições encontradas, e as chamadas convidam para uma decisão ou uma travessia — nunca para uma conversão genérica. A microcopy é direta, poética e levemente inquietante.

Exemplos:

> “O rei foi selado. A memória não.”

> “Abra o Livro I antes que a Coroa encontre você.”

### Wordmark e logo
O wordmark usa “A Chama” em serifas altas e “do Último Reino” em versaletes espaçados. A marca isolada é uma chama formada por **três traços rúnicos ascendentes**, com um corte vertical no centro: remete ao cristal quebrado, à chama azul e às três pontas da coroa de Malgor, sem reproduzir nenhuma delas literalmente.

### Cor de assinatura
**Azul Vigília — #4B7CFF.** Um azul elétrico, mineral e frio que só aparece na chama, nas runas e em estados de foco; é a impressão visual imediata de A Chama do Último Reino.

## Style Decisions

- O **Azul Vigília** permanece reservado à chama, às runas, ao foco e às palavras encantadas. Ações primárias usam papel, selo e ouro de brasa.
- A **linha de percurso dourada** funciona como fio narrativo contínuo: conecta os marcos da travessia, em vez de aparecer apenas como ornamento local.
- Cartelas alternam **personagens, documentos, objetos, sigilos e fragmentos**; grão mineral, coordenadas e selos acrescentam materialidade sem competir com a leitura.
